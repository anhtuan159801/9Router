-- 9Router Database Schema for Supabase

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  cloud_enabled BOOLEAN DEFAULT false,
  tunnel_enabled BOOLEAN DEFAULT false,
  tunnel_url TEXT DEFAULT '',
  tunnel_provider TEXT DEFAULT 'cloudflare',
  tailscale_enabled BOOLEAN DEFAULT false,
  tailscale_url TEXT DEFAULT '',
  sticky_round_robin_limit INTEGER DEFAULT 3,
  provider_strategies JSONB DEFAULT '{}',
  combo_strategy TEXT DEFAULT 'fallback',
  combo_strategies JSONB DEFAULT '{}',
  require_login BOOLEAN DEFAULT true,
  tunnel_dashboard_access BOOLEAN DEFAULT true,
  observability_enabled BOOLEAN DEFAULT true,
  observability_max_records INTEGER DEFAULT 1000,
  observability_batch_size INTEGER DEFAULT 20,
  observability_flush_interval_ms INTEGER DEFAULT 5000,
  observability_max_json_size INTEGER DEFAULT 1024,
  outbound_proxy_enabled BOOLEAN DEFAULT false,
  outbound_proxy_url TEXT DEFAULT '',
  outbound_no_proxy TEXT DEFAULT '',
  mitm_router_base_url TEXT DEFAULT 'http://localhost:20128',
  password TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Provider Connections
CREATE TABLE IF NOT EXISTS provider_connections (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  auth_type TEXT DEFAULT 'oauth',
  name TEXT,
  priority INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  display_name TEXT,
  email TEXT,
  global_priority INTEGER,
  default_model TEXT,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  project_id TEXT,
  api_key TEXT,
  test_status TEXT,
  last_tested TIMESTAMPTZ,
  last_error TEXT,
  last_error_at TIMESTAMPTZ,
  rate_limited_until TIMESTAMPTZ,
  expires_in INTEGER,
  error_code TEXT,
  consecutive_use_count INTEGER DEFAULT 0,
  provider_specific_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Provider Nodes
CREATE TABLE IF NOT EXISTS provider_nodes (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  prefix TEXT,
  api_type TEXT,
  base_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Proxy Pools
CREATE TABLE IF NOT EXISTS proxy_pools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  proxy_url TEXT NOT NULL,
  no_proxy TEXT DEFAULT '',
  type TEXT DEFAULT 'http',
  is_active BOOLEAN DEFAULT true,
  strict_proxy BOOLEAN DEFAULT false,
  test_status TEXT DEFAULT 'unknown',
  last_tested_at TIMESTAMPTZ,
  last_error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Model Aliases
CREATE TABLE IF NOT EXISTS model_aliases (
  alias TEXT PRIMARY KEY,
  model TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MITM Alias
CREATE TABLE IF NOT EXISTS mitm_alias (
  tool_name TEXT PRIMARY KEY,
  mappings JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Combos
CREATE TABLE IF NOT EXISTS combos (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  models JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- API Keys
CREATE TABLE IF NOT EXISTS api_keys (
  id TEXT PRIMARY KEY,
  name TEXT,
  key TEXT NOT NULL,
  machine_id TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pricing
CREATE TABLE IF NOT EXISTS pricing (
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  pricing_data JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (provider, model)
);

-- Insert default settings
INSERT INTO settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;