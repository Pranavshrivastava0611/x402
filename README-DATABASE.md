# Database Schema Documentation

This document describes the MonoPay database schema with project-based organization.

## 📊 Database Structure

### Tables Overview

1. **users** - User accounts
2. **projects** - User projects (each user can have multiple projects)
3. **project_configs** - API configurations per project
4. **api_keys** - API keys for project configurations
5. **payments** - Payment transactions per project
6. **wallet_connections** - User wallet connections
7. **used_nonces** - Anti-replay protection

## 🗄️ Table Details

### `users`

Stores user account information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| full_name | TEXT | User's full name |
| email | TEXT | Unique email address |
| password_hash | TEXT | Bcrypt hashed password |
| email_verified | BOOLEAN | Email verification status |
| created_at | TIMESTAMPTZ | Account creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### `projects`

User projects for organizing APIs.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| name | TEXT | Project name |
| description | TEXT | Project description |
| network | TEXT | 'mainnet' or 'devnet' |
| payout_wallet | TEXT | Default payout wallet address |
| active | BOOLEAN | Project active status |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### `project_configs`

API configuration settings per project.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| project_id | UUID | Foreign key to projects |
| price_lamports | BIGINT | Price per API call in lamports |
| allowed_routes | JSONB | Array of allowed API routes |
| service_id | TEXT | Unique service identifier |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### `api_keys`

API keys for authenticating requests.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| project_config_id | UUID | Foreign key to project_configs |
| key_hash | TEXT | Hashed API key |
| label | TEXT | Optional label for the key |
| revoked | BOOLEAN | Key revocation status |
| created_at | TIMESTAMPTZ | Creation timestamp |

### `payments`

Payment transactions per project.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| project_id | UUID | Foreign key to projects |
| payer_wallet | TEXT | Payer's wallet address |
| tx_signature | TEXT | Unique transaction signature |
| amount_lamports | BIGINT | Payment amount in lamports |
| memo | TEXT | Optional transaction memo |
| route | TEXT | API route that was called |
| status | TEXT | 'pending', 'verified', or 'failed' |
| verified_at | TIMESTAMPTZ | Verification timestamp |
| created_at | TIMESTAMPTZ | Creation timestamp |

### `wallet_connections`

User wallet connections.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| wallet_address | TEXT | Wallet address |
| network | TEXT | 'mainnet' or 'devnet' |
| verified | BOOLEAN | Verification status |
| created_at | TIMESTAMPTZ | Creation timestamp |

### `used_nonces`

Anti-replay protection for transactions.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| nonce | TEXT | Unique nonce value |
| tx_signature | TEXT | Foreign key to payments |
| created_at | TIMESTAMPTZ | Creation timestamp |

## 🔄 Relationships

```
users (1) ──< (many) projects
projects (1) ──< (many) project_configs
project_configs (1) ──< (many) api_keys
projects (1) ──< (many) payments
users (1) ──< (many) wallet_connections
payments (1) ──< (many) used_nonces
```

## 📈 Views

### `dashboard_summary`

Aggregated view for dashboard statistics.

```sql
SELECT
  user_id,
  full_name,
  total_projects,
  total_earned_lamports
FROM dashboard_summary
WHERE user_id = '...';
```

## 🔒 Row Level Security (RLS)

**Important**: The provided schema includes RLS policies that use `auth.uid()` from Supabase Auth. Since we're using JWT authentication, you have two options:

### Option 1: Disable RLS (Development)

For development, disable RLS on all tables:

```sql
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_configs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_connections DISABLE ROW LEVEL SECURITY;
```

### Option 2: Use Service Role Key

Use the service role key in API routes to bypass RLS. The `Database_client_api.ts` file provides this functionality.

### Option 3: Custom RLS Policies

Create custom RLS policies that work with JWT tokens by extracting user ID from the token.

## 🚀 Setup Instructions

1. **Run the schema**:
   ```sql
   -- Copy and paste database-schema.sql into Supabase SQL Editor
   ```

2. **Configure environment variables**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **For development, disable RLS** (see Option 1 above)

4. **Test the connection**:
   ```typescript
   import { supabase } from "@/utils/Database_client";
   
   const { data, error } = await supabase
     .from("users")
     .select("*")
     .limit(1);
   ```

## 📝 Notes

- All timestamps use `TIMESTAMPTZ` (timezone-aware)
- UUIDs are generated using `uuid_generate_v4()`
- Foreign keys use `ON DELETE CASCADE` for automatic cleanup
- Indexes are created for frequently queried columns
- The `updated_at` field is automatically updated via triggers

## 🔧 Maintenance

### Update Timestamps

The `update_timestamp()` function automatically updates `updated_at` fields via triggers.

### Cleanup

Cascade deletes ensure data integrity:
- Deleting a user deletes all their projects
- Deleting a project deletes all configs and payments
- Deleting a project_config deletes all API keys

