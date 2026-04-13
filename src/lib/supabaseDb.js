import { getSupabase, getSupabaseAdmin, isSupabaseConfigured } from "./supabase";

const DEFAULT_MITM_ROUTER_BASE = "http://localhost:20128";

const cloneDefaultData = () => ({
  providerConnections: [],
  providerNodes: [],
  proxyPools: [],
  modelAliases: {},
  mitmAlias: {},
  combos: [],
  apiKeys: [],
  settings: {
    cloudEnabled: false,
    tunnelEnabled: false,
    tunnelUrl: "",
    tunnelProvider: "cloudflare",
    tailscaleEnabled: false,
    tailscaleUrl: "",
    stickyRoundRobinLimit: 3,
    providerStrategies: {},
    comboStrategy: "fallback",
    comboStrategies: {},
    requireLogin: true,
    tunnelDashboardAccess: true,
    observabilityEnabled: true,
    observabilityMaxRecords: 1000,
    observabilityBatchSize: 20,
    observabilityFlushIntervalMs: 5000,
    observabilityMaxJsonSize: 1024,
    outboundProxyEnabled: false,
    outboundProxyUrl: "",
    outboundNoProxy: "",
    mitmRouterBaseUrl: DEFAULT_MITM_ROUTER_BASE,
  },
  pricing: {},
});

function mapDbToSettings(db) {
  if (!db) return cloneDefaultData().settings;
  return {
    cloudEnabled: db.cloud_enabled ?? false,
    tunnelEnabled: db.tunnel_enabled ?? false,
    tunnelUrl: db.tunnel_url ?? "",
    tunnelProvider: db.tunnel_provider ?? "cloudflare",
    tailscaleEnabled: db.tailscale_enabled ?? false,
    tailscaleUrl: db.tailscale_url ?? "",
    stickyRoundRobinLimit: db.sticky_round_robin_limit ?? 3,
    providerStrategies: db.provider_strategies ?? {},
    comboStrategy: db.combo_strategy ?? "fallback",
    comboStrategies: db.combo_strategies ?? {},
    requireLogin: db.require_login ?? true,
    tunnelDashboardAccess: db.tunnel_dashboard_access ?? true,
    observabilityEnabled: db.observability_enabled ?? true,
    observabilityMaxRecords: db.observability_max_records ?? 1000,
    observabilityBatchSize: db.observability_batch_size ?? 20,
    observabilityFlushIntervalMs: db.observability_flush_interval_ms ?? 5000,
    observabilityMaxJsonSize: db.observability_max_json_size ?? 1024,
    outboundProxyEnabled: db.outbound_proxy_enabled ?? false,
    outboundProxyUrl: db.outbound_proxy_url ?? "",
    outboundNoProxy: db.outbound_no_proxy ?? "",
    mitmRouterBaseUrl: db.mitm_router_base_url ?? DEFAULT_MITM_ROUTER_BASE,
    password: db.password,
  };
}

export async function getSettings() {
  if (!isSupabaseConfigured()) {
    return cloneDefaultData().settings;
  }

  const { data, error } = await getSupabaseAdmin()
    .from("settings")
    .select("*")
    .eq("id", "default")
    .single();

  if (error || !data) {
    return cloneDefaultData().settings;
  }

  return mapDbToSettings(data);
}

export async function updateSettings(updates) {
  if (!isSupabaseConfigured()) {
    return cloneDefaultData().settings;
  }

  const db = await getSupabaseAdmin()
    .from("settings")
    .update({
      cloud_enabled: updates.cloudEnabled,
      tunnel_enabled: updates.tunnelEnabled,
      tunnel_url: updates.tunnelUrl,
      tunnel_provider: updates.tunnelProvider,
      tailscale_enabled: updates.tailscaleEnabled,
      tailscale_url: updates.tailscaleUrl,
      sticky_round_robin_limit: updates.stickyRoundRobinLimit,
      provider_strategies: updates.providerStrategies,
      combo_strategy: updates.comboStrategy,
      combo_strategies: updates.comboStrategies,
      require_login: updates.requireLogin,
      tunnel_dashboard_access: updates.tunnelDashboardAccess,
      observability_enabled: updates.observabilityEnabled,
      observability_max_records: updates.observabilityMaxRecords,
      observability_batch_size: updates.observabilityBatchSize,
      observability_flush_interval_ms: updates.observabilityFlushIntervalMs,
      observability_max_json_size: updates.observabilityMaxJsonSize,
      outbound_proxy_enabled: updates.outboundProxyEnabled,
      outbound_proxy_url: updates.outboundProxyUrl,
      outbound_no_proxy: updates.outboundNoProxy,
      mitm_router_base_url: updates.mitmRouterBaseUrl,
      password: updates.password,
      updated_at: new Date().toISOString(),
    })
    .eq("id", "default")
    .select()
    .single();

  if (db.error) throw db.error;
  return mapDbToSettings(db.data);
}

export async function getProviderConnections(filter = {}) {
  if (!isSupabaseConfigured()) return [];

  let query = getSupabaseAdmin().from("provider_connections").select("*");

  if (filter.provider) query = query.eq("provider", filter.provider);
  if (filter.isActive !== undefined) query = query.eq("is_active", filter.isActive);

  const { data, error } = await query;
  if (error) return [];

  return data.sort((a, b) => (a.priority || 999) - (b.priority || 999));
}

export async function getProviderNodes(filter = {}) {
  if (!isSupabaseConfigured()) return [];

  let query = getSupabaseAdmin().from("provider_nodes").select("*");
  if (filter.type) query = query.eq("type", filter.type);

  const { data, error } = await query;
  if (error) return [];
  return data;
}

export async function getProviderNodeById(id) {
  if (!isSupabaseConfigured()) return null;

  const { data } = await getSupabaseAdmin()
    .from("provider_nodes")
    .select("*")
    .eq("id", id)
    .single();

  return data || null;
}

export async function createProviderNode(data) {
  if (!isSupabaseConfigured()) return null;

  const node = {
    id: data.id,
    type: data.type,
    name: data.name,
    prefix: data.prefix,
    api_type: data.apiType,
    base_url: data.baseUrl,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data: result, error } = await getSupabaseAdmin()
    .from("provider_nodes")
    .insert(node)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateProviderNode(id, data) {
  if (!isSupabaseConfigured()) return null;

  const { data: result, error } = await getSupabaseAdmin()
    .from("provider_nodes")
    .update({
      type: data.type,
      name: data.name,
      prefix: data.prefix,
      api_type: data.apiType,
      base_url: data.baseUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteProviderNode(id) {
  if (!isSupabaseConfigured()) return false;

  const { error } = await getSupabaseAdmin()
    .from("provider_nodes")
    .delete()
    .eq("id", id);

  return !error;
}

export async function getProxyPools(filter = {}) {
  if (!isSupabaseConfigured()) return [];

  let query = getSupabaseAdmin().from("proxy_pools").select("*");
  if (filter.isActive !== undefined) query = query.eq("is_active", filter.isActive);
  if (filter.testStatus) query = query.eq("test_status", filter.testStatus);

  const { data, error } = await query;
  if (error) return [];

  return data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}

export async function getProxyPoolById(id) {
  if (!isSupabaseConfigured()) return null;

  const { data } = await getSupabaseAdmin()
    .from("proxy_pools")
    .select("*")
    .eq("id", id)
    .single();

  return data || null;
}

export async function createProxyPool(data) {
  if (!isSupabaseConfigured()) return null;

  const now = new Date().toISOString();
  const pool = {
    id: data.id,
    name: data.name,
    proxy_url: data.proxyUrl,
    no_proxy: data.noProxy || "",
    type: data.type || "http",
    is_active: data.isActive !== undefined ? data.isActive : true,
    strict_proxy: data.strictProxy || false,
    test_status: data.testStatus || "unknown",
    last_tested_at: data.lastTestedAt || null,
    last_error: data.lastError || null,
    created_at: now,
    updated_at: now,
  };

  const { data: result, error } = await getSupabaseAdmin()
    .from("proxy_pools")
    .insert(pool)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateProxyPool(id, data) {
  if (!isSupabaseConfigured()) return null;

  const { data: result, error } = await getSupabaseAdmin()
    .from("proxy_pools")
    .update({
      name: data.name,
      proxy_url: data.proxyUrl,
      no_proxy: data.noProxy,
      type: data.type,
      is_active: data.isActive,
      strict_proxy: data.strictProxy,
      test_status: data.testStatus,
      last_tested_at: data.lastTestedAt,
      last_error: data.lastError,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteProxyPool(id) {
  if (!isSupabaseConfigured()) return false;

  const { error } = await getSupabaseAdmin()
    .from("proxy_pools")
    .delete()
    .eq("id", id);

  return !error;
}

export async function deleteProviderConnectionsByProvider(providerId) {
  if (!isSupabaseConfigured()) return 0;

  const { data } = await getSupabaseAdmin()
    .from("provider_connections")
    .select("id")
    .eq("provider", providerId);

  const count = data?.length || 0;

  if (count > 0) {
    await getSupabaseAdmin()
      .from("provider_connections")
      .delete()
      .eq("provider", providerId);
  }

  return count;
}

export async function getProviderConnectionById(id) {
  if (!isSupabaseConfigured()) return null;

  const { data } = await getSupabaseAdmin()
    .from("provider_connections")
    .select("*")
    .eq("id", id)
    .single();

  return data || null;
}

export async function createProviderConnection(data) {
  if (!isSupabaseConfigured()) return null;

  const now = new Date().toISOString();
  const connection = {
    id: data.id,
    provider: data.provider,
    auth_type: data.authType || "oauth",
    name: data.name,
    priority: data.priority || 1,
    is_active: data.isActive !== undefined ? data.isActive : true,
    display_name: data.displayName,
    email: data.email,
    global_priority: data.globalPriority,
    default_model: data.defaultModel,
    access_token: data.accessToken,
    refresh_token: data.refreshToken,
    expires_at: data.expiresAt,
    token_type: data.tokenType,
    scope: data.scope,
    id_token: data.idToken,
    project_id: data.projectId,
    api_key: data.apiKey,
    test_status: data.testStatus,
    last_tested: data.lastTested,
    last_error: data.lastError,
    last_error_at: data.lastErrorAt,
    rate_limited_until: data.rateLimitedUntil,
    expires_in: data.expiresIn,
    error_code: data.errorCode,
    consecutive_use_count: data.consecutiveUseCount || 0,
    provider_specific_data: data.providerSpecificData,
    created_at: now,
    updated_at: now,
  };

  const { data: result, error } = await getSupabaseAdmin()
    .from("provider_connections")
    .insert(connection)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateProviderConnection(id, data) {
  if (!isSupabaseConfigured()) return null;

  const { data: result, error } = await getSupabaseAdmin()
    .from("provider_connections")
    .update({
      provider: data.provider,
      auth_type: data.authType,
      name: data.name,
      priority: data.priority,
      is_active: data.isActive,
      display_name: data.displayName,
      email: data.email,
      global_priority: data.globalPriority,
      default_model: data.defaultModel,
      access_token: data.accessToken,
      refresh_token: data.refreshToken,
      expires_at: data.expiresAt,
      token_type: data.tokenType,
      scope: data.scope,
      id_token: data.idToken,
      project_id: data.projectId,
      api_key: data.apiKey,
      test_status: data.testStatus,
      last_tested: data.lastTested,
      last_error: data.lastError,
      last_error_at: data.lastErrorAt,
      rate_limited_until: data.rateLimitedUntil,
      expires_in: data.expiresIn,
      error_code: data.errorCode,
      consecutive_use_count: data.consecutiveUseCount,
      provider_specific_data: data.providerSpecificData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteProviderConnection(id) {
  if (!isSupabaseConfigured()) return false;

  const { error } = await getSupabaseAdmin()
    .from("provider_connections")
    .delete()
    .eq("id", id);

  return !error;
}

export async function reorderProviderConnections(providerId) {
  if (!isSupabaseConfigured()) return;

  const { data } = await getSupabaseAdmin()
    .from("provider_connections")
    .select("*")
    .eq("provider", providerId)
    .order("priority", { ascending: true })
    .order("updated_at", { ascending: false });

  if (!data) return;

  for (let i = 0; i < data.length; i++) {
    await getSupabaseAdmin()
      .from("provider_connections")
      .update({ priority: i + 1 })
      .eq("id", data[i].id);
  }
}

export async function getModelAliases() {
  if (!isSupabaseConfigured()) return {};

  const { data } = await getSupabaseAdmin().from("model_aliases").select("*");
  if (!data) return {};

  const aliases = {};
  for (const row of data) {
    aliases[row.alias] = row.model;
  }
  return aliases;
}

export async function setModelAlias(alias, model) {
  if (!isSupabaseConfigured()) return;

  await getSupabaseAdmin()
    .from("model_aliases")
    .upsert({ alias, model, updated_at: new Date().toISOString() }, { onConflict: "alias" });
}

export async function deleteModelAlias(alias) {
  if (!isSupabaseConfigured()) return;

  await getSupabaseAdmin().from("model_aliases").delete().eq("alias", alias);
}

export async function getMitmAlias(toolName) {
  if (!isSupabaseConfigured()) return {};

  if (toolName) {
    const { data } = await getSupabaseAdmin()
      .from("mitm_alias")
      .select("mappings")
      .eq("tool_name", toolName)
      .single();
    return data?.mappings || {};
  }

  const { data } = await getSupabaseAdmin().from("mitm_alias").select("*");
  if (!data) return {};

  const aliases = {};
  for (const row of data) {
    aliases[row.tool_name] = row.mappings;
  }
  return aliases;
}

export async function setMitmAliasAll(toolName, mappings) {
  if (!isSupabaseConfigured()) return;

  await getSupabaseAdmin()
    .from("mitm_alias")
    .upsert(
      { tool_name: toolName, mappings: mappings || {}, updated_at: new Date().toISOString() },
      { onConflict: "tool_name" }
    );
}

export async function getCombos() {
  if (!isSupabaseConfigured()) return [];

  const { data } = await getSupabaseAdmin().from("combos").select("*").order("created_at", { ascending: false });
  return data || [];
}

export async function getComboById(id) {
  if (!isSupabaseConfigured()) return null;

  const { data } = await getSupabaseAdmin().from("combos").select("*").eq("id", id).single();
  return data || null;
}

export async function getComboByName(name) {
  if (!isSupabaseConfigured()) return null;

  const { data } = await getSupabaseAdmin().from("combos").select("*").eq("name", name).single();
  return data || null;
}

export async function createCombo(data) {
  if (!isSupabaseConfigured()) return null;

  const now = new Date().toISOString();
  const combo = {
    id: data.id,
    name: data.name,
    models: data.models || [],
    created_at: now,
    updated_at: now,
  };

  const { data: result, error } = await getSupabaseAdmin()
    .from("combos")
    .insert(combo)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateCombo(id, data) {
  if (!isSupabaseConfigured()) return null;

  const { data: result, error } = await getSupabaseAdmin()
    .from("combos")
    .update({
      name: data.name,
      models: data.models,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteCombo(id) {
  if (!isSupabaseConfigured()) return false;

  const { error } = await getSupabaseAdmin().from("combos").delete().eq("id", id);
  return !error;
}

export async function getApiKeys() {
  if (!isSupabaseConfigured()) return [];

  const { data } = await getSupabaseAdmin().from("api_keys").select("*");
  return data || [];
}

export async function createApiKey(name, machineId) {
  if (!isSupabaseConfigured()) return null;

  const { generateApiKeyWithMachine } = await import("@/shared/utils/apiKey");
  const result = generateApiKeyWithMachine(machineId);

  const apiKey = {
    id: require("uuid").v4(),
    name,
    key: result.key,
    machine_id: machineId,
    is_active: true,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await getSupabaseAdmin()
    .from("api_keys")
    .insert(apiKey)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteApiKey(id) {
  if (!isSupabaseConfigured()) return false;

  const { error } = await getSupabaseAdmin().from("api_keys").delete().eq("id", id);
  return !error;
}

export async function getApiKeyById(id) {
  if (!isSupabaseConfigured()) return null;

  const { data } = await getSupabaseAdmin().from("api_keys").select("*").eq("id", id).single();
  return data || null;
}

export async function updateApiKey(id, data) {
  if (!isSupabaseConfigured()) return null;

  const { data: result, error } = await getSupabaseAdmin()
    .from("api_keys")
    .update({ name: data.name, is_active: data.isActive })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function validateApiKey(key) {
  if (!isSupabaseConfigured()) return false;

  const { data } = await getSupabaseAdmin().from("api_keys").select("is_active").eq("key", key).single();
  return data && data.is_active !== false;
}

export async function getPricing() {
  if (!isSupabaseConfigured()) return {};

  const { PROVIDER_PRICING } = await import("@/shared/constants/pricing.js");
  const { data } = await getSupabaseAdmin().from("pricing").select("*");

  const merged = { ...PROVIDER_PRICING };

  if (data) {
    for (const row of data) {
      if (!merged[row.provider]) {
        merged[row.provider] = {};
      }
      merged[row.provider][row.model] = row.pricing_data;
    }
  }

  return merged;
}

export async function getPricingForModel(provider, model) {
  if (!model || !isSupabaseConfigured()) return null;

  const { data } = await getSupabaseAdmin()
    .from("pricing")
    .select("pricing_data")
    .eq("provider", provider)
    .eq("model", model)
    .single();

  if (data?.pricing_data) return data.pricing_data;

  const { getPricingForModel: resolve } = await import("@/shared/constants/pricing.js");
  return resolve(provider, model);
}

export async function updatePricing(pricingData) {
  if (!isSupabaseConfigured()) return {};

  for (const [provider, models] of Object.entries(pricingData)) {
    for (const [model, pricing] of Object.entries(models)) {
      await getSupabaseAdmin()
        .from("pricing")
        .upsert(
          {
            provider,
            model,
            pricing_data: pricing,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "provider,model" }
        );
    }
  }

  return pricingData;
}

export async function resetPricing(provider, model) {
  if (!isSupabaseConfigured()) return;

  if (model) {
    await getSupabaseAdmin()
      .from("pricing")
      .delete()
      .eq("provider", provider)
      .eq("model", model);
  } else {
    await getSupabaseAdmin().from("pricing").delete().eq("provider", provider);
  }
}

export async function resetAllPricing() {
  if (!isSupabaseConfigured()) return;

  await getSupabaseAdmin().from("pricing").delete();
}

export async function syncFromLocalDb(localDbData) {
  if (!localDbData || !isSupabaseConfigured()) return;

  const settings = mapDbToSettings(localDbData.settings);
  await getSupabaseAdmin().from("settings").upsert({ id: "default", ...settings, updated_at: new Date().toISOString() }, { onConflict: "id" });

  for (const conn of localDbData.providerConnections || []) {
    await getSupabaseAdmin().from("provider_connections").upsert(conn, { onConflict: "id" });
  }

  for (const node of localDbData.providerNodes || []) {
    await getSupabaseAdmin().from("provider_nodes").upsert(node, { onConflict: "id" });
  }

  for (const pool of localDbData.proxyPools || []) {
    await getSupabaseAdmin().from("proxy_pools").upsert(pool, { onConflict: "id" });
  }

  for (const [alias, model] of Object.entries(localDbData.modelAliases || {})) {
    await getSupabaseAdmin().from("model_aliases").upsert({ alias, model }, { onConflict: "alias" });
  }

  for (const [tool, mappings] of Object.entries(localDbData.mitmAlias || {})) {
    await getSupabaseAdmin().from("mitm_alias").upsert({ tool_name: tool, mappings }, { onConflict: "tool_name" });
  }

  for (const combo of localDbData.combos || []) {
    await getSupabaseAdmin().from("combos").upsert(combo, { onConflict: "id" });
  }

  for (const key of localDbData.apiKeys || []) {
    await getSupabaseAdmin().from("api_keys").upsert(key, { onConflict: "id" });
  }

  for (const [provider, models] of Object.entries(localDbData.pricing || {})) {
    for (const [model, pricing] of Object.entries(models)) {
      await getSupabaseAdmin()
        .from("pricing")
        .upsert({ provider, model, pricing_data: pricing }, { onConflict: "provider,model" });
    }
  }

  console.log("[SupabaseDB] Sync completed");
}