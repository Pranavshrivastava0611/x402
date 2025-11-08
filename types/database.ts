// Database types for MonoPay

export interface User {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  network: "mainnet" | "devnet";
  payout_wallet: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectConfig {
  id: string;
  project_id: string;
  price_lamports: number;
  allowed_routes: string[];
  service_id: string;
  created_at: string;
  updated_at: string;
}

export interface ApiKey {
  id: string;
  project_config_id: string;
  key_hash: string;
  label: string | null;
  revoked: boolean;
  created_at: string;
}

export interface Payment {
  id: string;
  project_id: string;
  payer_wallet: string;
  tx_signature: string;
  amount_lamports: number;
  memo: string | null;
  route: string | null;
  status: "pending" | "verified" | "failed";
  verified_at: string;
  created_at: string;
}

export interface WalletConnection {
  id: string;
  user_id: string;
  wallet_address: string;
  network: "mainnet" | "devnet";
  verified: boolean;
  created_at: string;
}

export interface UsedNonce {
  id: string;
  nonce: string;
  tx_signature: string;
  created_at: string;
}

export interface DashboardSummary {
  user_id: string;
  full_name: string;
  total_projects: number;
  total_earned_lamports: number;
}

