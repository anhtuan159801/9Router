import { isSupabaseConfigured } from "./supabase";

let useSupabase = false;

export async function initDb() {
  useSupabase = isSupabaseConfigured();
  console.log(`[DB] Using ${useSupabase ? "Supabase" : "Local File"}`);
}

export async function getDb() {
  if (useSupabase) {
    const { getDb: getSupabaseDb } = await import("./supabaseDb");
    return getSupabaseDb();
  } else {
    const { getDb: getLocalDb } = await import("./localDb");
    return getLocalDb();
  }
}

export async function getSettings() {
  if (useSupabase) {
    const { getSettings } = await import("./supabaseDb");
    return getSettings();
  } else {
    const { getSettings } = await import("./localDb");
    return getSettings();
  }
}

export async function updateSettings(updates) {
  if (useSupabase) {
    const { updateSettings } = await import("./supabaseDb");
    return updateSettings(updates);
  } else {
    const { updateSettings } = await import("./localDb");
    return updateSettings(updates);
  }
}

export async function getProviderConnections(filter = {}) {
  if (useSupabase) {
    const { getProviderConnections } = await import("./supabaseDb");
    return getProviderConnections(filter);
  } else {
    const { getProviderConnections } = await import("./localDb");
    return getProviderConnections(filter);
  }
}

export async function getProviderNodes(filter = {}) {
  if (useSupabase) {
    const { getProviderNodes } = await import("./supabaseDb");
    return getProviderNodes(filter);
  } else {
    const { getProviderNodes } = await import("./localDb");
    return getProviderNodes(filter);
  }
}

export async function getProviderNodeById(id) {
  if (useSupabase) {
    const { getProviderNodeById } = await import("./supabaseDb");
    return getProviderNodeById(id);
  } else {
    const { getProviderNodeById } = await import("./localDb");
    return getProviderNodeById(id);
  }
}

export async function createProviderNode(data) {
  if (useSupabase) {
    const { createProviderNode } = await import("./supabaseDb");
    return createProviderNode(data);
  } else {
    const { createProviderNode } = await import("./localDb");
    return createProviderNode(data);
  }
}

export async function updateProviderNode(id, data) {
  if (useSupabase) {
    const { updateProviderNode } = await import("./supabaseDb");
    return updateProviderNode(id, data);
  } else {
    const { updateProviderNode } = await import("./localDb");
    return updateProviderNode(id, data);
  }
}

export async function deleteProviderNode(id) {
  if (useSupabase) {
    const { deleteProviderNode } = await import("./supabaseDb");
    return deleteProviderNode(id);
  } else {
    const { deleteProviderNode } = await import("./localDb");
    return deleteProviderNode(id);
  }
}

export async function getProxyPools(filter = {}) {
  if (useSupabase) {
    const { getProxyPools } = await import("./supabaseDb");
    return getProxyPools(filter);
  } else {
    const { getProxyPools } = await import("./localDb");
    return getProxyPools(filter);
  }
}

export async function getProxyPoolById(id) {
  if (useSupabase) {
    const { getProxyPoolById } = await import("./supabaseDb");
    return getProxyPoolById(id);
  } else {
    const { getProxyPoolById } = await import("./localDb");
    return getProxyPoolById(id);
  }
}

export async function createProxyPool(data) {
  if (useSupabase) {
    const { createProxyPool } = await import("./supabaseDb");
    return createProxyPool(data);
  } else {
    const { createProxyPool } = await import("./localDb");
    return createProxyPool(data);
  }
}

export async function updateProxyPool(id, data) {
  if (useSupabase) {
    const { updateProxyPool } = await import("./supabaseDb");
    return updateProxyPool(id, data);
  } else {
    const { updateProxyPool } = await import("./localDb");
    return updateProxyPool(id, data);
  }
}

export async function deleteProxyPool(id) {
  if (useSupabase) {
    const { deleteProxyPool } = await import("./supabaseDb");
    return deleteProxyPool(id);
  } else {
    const { deleteProxyPool } = await import("./localDb");
    return deleteProxyPool(id);
  }
}

export async function deleteProviderConnectionsByProvider(providerId) {
  if (useSupabase) {
    const { deleteProviderConnectionsByProvider } = await import("./supabaseDb");
    return deleteProviderConnectionsByProvider(providerId);
  } else {
    const { deleteProviderConnectionsByProvider } = await import("./localDb");
    return deleteProviderConnectionsByProvider(providerId);
  }
}

export async function getProviderConnectionById(id) {
  if (useSupabase) {
    const { getProviderConnectionById } = await import("./supabaseDb");
    return getProviderConnectionById(id);
  } else {
    const { getProviderConnectionById } = await import("./localDb");
    return getProviderConnectionById(id);
  }
}

export async function createProviderConnection(data) {
  if (useSupabase) {
    const { createProviderConnection } = await import("./supabaseDb");
    return createProviderConnection(data);
  } else {
    const { createProviderConnection } = await import("./localDb");
    return createProviderConnection(data);
  }
}

export async function updateProviderConnection(id, data) {
  if (useSupabase) {
    const { updateProviderConnection } = await import("./supabaseDb");
    return updateProviderConnection(id, data);
  } else {
    const { updateProviderConnection } = await import("./localDb");
    return updateProviderConnection(id, data);
  }
}

export async function deleteProviderConnection(id) {
  if (useSupabase) {
    const { deleteProviderConnection } = await import("./supabaseDb");
    return deleteProviderConnection(id);
  } else {
    const { deleteProviderConnection } = await import("./localDb");
    return deleteProviderConnection(id);
  }
}

export async function reorderProviderConnections(providerId) {
  if (useSupabase) {
    const { reorderProviderConnections } = await import("./supabaseDb");
    return reorderProviderConnections(providerId);
  } else {
    const { reorderProviderConnections } = await import("./localDb");
    return reorderProviderConnections(providerId);
  }
}

export async function getModelAliases() {
  if (useSupabase) {
    const { getModelAliases } = await import("./supabaseDb");
    return getModelAliases();
  } else {
    const { getModelAliases } = await import("./localDb");
    return getModelAliases();
  }
}

export async function setModelAlias(alias, model) {
  if (useSupabase) {
    const { setModelAlias } = await import("./supabaseDb");
    return setModelAlias(alias, model);
  } else {
    const { setModelAlias } = await import("./localDb");
    return setModelAlias(alias, model);
  }
}

export async function deleteModelAlias(alias) {
  if (useSupabase) {
    const { deleteModelAlias } = await import("./supabaseDb");
    return deleteModelAlias(alias);
  } else {
    const { deleteModelAlias } = await import("./localDb");
    return deleteModelAlias(alias);
  }
}

export async function getMitmAlias(toolName) {
  if (useSupabase) {
    const { getMitmAlias } = await import("./supabaseDb");
    return getMitmAlias(toolName);
  } else {
    const { getMitmAlias } = await import("./localDb");
    return getMitmAlias(toolName);
  }
}

export async function setMitmAliasAll(toolName, mappings) {
  if (useSupabase) {
    const { setMitmAliasAll } = await import("./supabaseDb");
    return setMitmAliasAll(toolName, mappings);
  } else {
    const { setMitmAliasAll } = await import("./localDb");
    return setMitmAliasAll(toolName, mappings);
  }
}

export async function getCombos() {
  if (useSupabase) {
    const { getCombos } = await import("./supabaseDb");
    return getCombos();
  } else {
    const { getCombos } = await import("./localDb");
    return getCombos();
  }
}

export async function getComboById(id) {
  if (useSupabase) {
    const { getComboById } = await import("./supabaseDb");
    return getComboById(id);
  } else {
    const { getComboById } = await import("./localDb");
    return getComboById(id);
  }
}

export async function getComboByName(name) {
  if (useSupabase) {
    const { getComboByName } = await import("./supabaseDb");
    return getComboByName(name);
  } else {
    const { getComboByName } = await import("./localDb");
    return getComboByName(name);
  }
}

export async function createCombo(data) {
  if (useSupabase) {
    const { createCombo } = await import("./supabaseDb");
    return createCombo(data);
  } else {
    const { createCombo } = await import("./localDb");
    return createCombo(data);
  }
}

export async function updateCombo(id, data) {
  if (useSupabase) {
    const { updateCombo } = await import("./supabaseDb");
    return updateCombo(id, data);
  } else {
    const { updateCombo } = await import("./localDb");
    return updateCombo(id, data);
  }
}

export async function deleteCombo(id) {
  if (useSupabase) {
    const { deleteCombo } = await import("./supabaseDb");
    return deleteCombo(id);
  } else {
    const { deleteCombo } = await import("./localDb");
    return deleteCombo(id);
  }
}

export async function getApiKeys() {
  if (useSupabase) {
    const { getApiKeys } = await import("./supabaseDb");
    return getApiKeys();
  } else {
    const { getApiKeys } = await import("./localDb");
    return getApiKeys();
  }
}

export async function createApiKey(name, machineId) {
  if (useSupabase) {
    const { createApiKey } = await import("./supabaseDb");
    return createApiKey(name, machineId);
  } else {
    const { createApiKey } = await import("./localDb");
    return createApiKey(name, machineId);
  }
}

export async function deleteApiKey(id) {
  if (useSupabase) {
    const { deleteApiKey } = await import("./supabaseDb");
    return deleteApiKey(id);
  } else {
    const { deleteApiKey } = await import("./localDb");
    return deleteApiKey(id);
  }
}

export async function getApiKeyById(id) {
  if (useSupabase) {
    const { getApiKeyById } = await import("./supabaseDb");
    return getApiKeyById(id);
  } else {
    const { getApiKeyById } = await import("./localDb");
    return getApiKeyById(id);
  }
}

export async function updateApiKey(id, data) {
  if (useSupabase) {
    const { updateApiKey } = await import("./supabaseDb");
    return updateApiKey(id, data);
  } else {
    const { updateApiKey } = await import("./localDb");
    return updateApiKey(id, data);
  }
}

export async function validateApiKey(key) {
  if (useSupabase) {
    const { validateApiKey } = await import("./supabaseDb");
    return validateApiKey(key);
  } else {
    const { validateApiKey } = await import("./localDb");
    return validateApiKey(key);
  }
}

export async function getPricing() {
  if (useSupabase) {
    const { getPricing } = await import("./supabaseDb");
    return getPricing();
  } else {
    const { getPricing } = await import("./localDb");
    return getPricing();
  }
}

export async function getPricingForModel(provider, model) {
  if (useSupabase) {
    const { getPricingForModel } = await import("./supabaseDb");
    return getPricingForModel(provider, model);
  } else {
    const { getPricingForModel } = await import("./localDb");
    return getPricingForModel(provider, model);
  }
}

export async function updatePricing(pricingData) {
  if (useSupabase) {
    const { updatePricing } = await import("./supabaseDb");
    return updatePricing(pricingData);
  } else {
    const { updatePricing } = await import("./localDb");
    return updatePricing(pricingData);
  }
}

export async function resetPricing(provider, model) {
  if (useSupabase) {
    const { resetPricing } = await import("./supabaseDb");
    return resetPricing(provider, model);
  } else {
    const { resetPricing } = await import("./localDb");
    return resetPricing(provider, model);
  }
}

export async function resetAllPricing() {
  if (useSupabase) {
    const { resetAllPricing } = await import("./supabaseDb");
    return resetAllPricing();
  } else {
    const { resetAllPricing } = await import("./localDb");
    return resetAllPricing();
  }
}

export async function exportDb() {
  if (useSupabase) {
    const settings = await getSettings();
    const connections = await getProviderConnections();
    const nodes = await getProviderNodes();
    const pools = await getProxyPools();
    const aliases = await getModelAliases();
    const mitm = await getMitmAlias();
    const combos = await getCombos();
    const keys = await getApiKeys();
    const pricing = await getPricing();
    
    return {
      providerConnections: connections,
      providerNodes: nodes,
      proxyPools: pools,
      modelAliases: aliases,
      mitmAlias: mitm,
      combos: combos,
      apiKeys: keys,
      settings,
      pricing,
    };
  } else {
    const { exportDb } = await import("./localDb");
    return exportDb();
  }
}

export async function importDb(payload) {
  if (useSupabase) {
    const { syncFromLocalDb } = await import("./supabaseDb");
    return syncFromLocalDb(payload);
  } else {
    const { importDb } = await import("./localDb");
    return importDb(payload);
  }
}

export async function isCloudEnabled() {
  const settings = await getSettings();
  return settings?.cloudEnabled === true;
}

export async function getCloudUrl() {
  const settings = await getSettings();
  return (
    settings?.cloudUrl ||
    process.env.CLOUD_URL ||
    process.env.NEXT_PUBLIC_CLOUD_URL ||
    ""
  );
}

export async function syncFromLocalDb(localDbData) {
  if (useSupabase) {
    const { syncFromLocalDb } = await import("./supabaseDb");
    return syncFromLocalDb(localDbData);
  }
}

export async function cleanupProviderConnections() {
  if (useSupabase) {
    return 0;
  } else {
    const { cleanupProviderConnections } = await import("./localDb");
    return cleanupProviderConnections();
  }
}