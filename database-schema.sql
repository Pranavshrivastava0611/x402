-- =====================================================
-- MONOPAY (with Projects per User)
-- =====================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS
-- =====================================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PROJECTS
-- =====================================================
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  network TEXT DEFAULT 'mainnet', -- mainnet / devnet
  payout_wallet TEXT,             -- default payout wallet
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PROJECT CONFIGURATIONS (per-project API settings)
-- =====================================================
CREATE TABLE public.project_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  price_lamports BIGINT NOT NULL,
  allowed_routes JSONB NOT NULL,
  service_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- API KEYS (for each project configuration)
-- =====================================================
CREATE TABLE public.api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_config_id UUID REFERENCES public.project_configs(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL,
  label TEXT,
  revoked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PAYMENTS (per project)
-- =====================================================
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  payer_wallet TEXT NOT NULL,
  tx_signature TEXT UNIQUE NOT NULL,
  amount_lamports BIGINT NOT NULL,
  memo TEXT,
  route TEXT,
  status TEXT DEFAULT 'verified',
  verified_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- WALLET CONNECTIONS (for user)
-- =====================================================
CREATE TABLE public.wallet_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  network TEXT DEFAULT 'mainnet',
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- USED NONCES (anti-replay)
-- =====================================================
CREATE TABLE public.used_nonces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nonce TEXT UNIQUE NOT NULL,
  tx_signature TEXT REFERENCES public.payments(tx_signature) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TRIGGER: AUTO UPDATE updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_users
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER trg_update_projects
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER trg_update_project_configs
BEFORE UPDATE ON public.project_configs
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

-- =====================================================
-- VIEWS (for dashboard summary)
-- =====================================================
CREATE VIEW public.dashboard_summary AS
SELECT
  u.id AS user_id,
  u.full_name,
  COUNT(p.id) AS total_projects,
  COALESCE(SUM(pay.amount_lamports), 0) AS total_earned_lamports
FROM public.users u
LEFT JOIN public.projects p ON p.user_id = u.id
LEFT JOIN public.payments pay ON pay.project_id = p.id
GROUP BY u.id;

-- =====================================================
-- INDEXES (for performance)
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_project_configs_project_id ON public.project_configs(project_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_project_config_id ON public.api_keys(project_config_id);
CREATE INDEX IF NOT EXISTS idx_payments_project_id ON public.payments(project_id);
CREATE INDEX IF NOT EXISTS idx_payments_tx_signature ON public.payments(tx_signature);
CREATE INDEX IF NOT EXISTS idx_wallet_connections_user_id ON public.wallet_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_used_nonces_nonce ON public.used_nonces(nonce);

-- =====================================================
-- ENABLE RLS
-- =====================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_connections ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES (Note: These use auth.uid() which requires Supabase Auth)
-- For JWT-based auth, you may need to disable RLS or use service role
-- =====================================================

-- For development/testing, you can disable RLS:
-- ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.project_configs DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.api_keys DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.payments DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.wallet_connections DISABLE ROW LEVEL SECURITY;

-- If using Supabase Auth alongside JWT, uncomment these policies:
/*
CREATE POLICY "Users can view their own data"
ON public.users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can manage their own projects"
ON public.projects
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage configs for their projects"
ON public.project_configs
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.projects pr
    WHERE pr.id = project_configs.project_id
    AND pr.user_id = auth.uid()
  )
);

CREATE POLICY "Users can view payments of their projects"
ON public.payments
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.projects pr
    WHERE pr.id = payments.project_id
    AND pr.user_id = auth.uid()
  )
);
*/

-- =====================================================
-- ✅ DONE
-- =====================================================
