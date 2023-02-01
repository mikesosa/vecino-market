import ApiClientSingleton from "../apiClient.js";

const marketClient = ApiClientSingleton.getApiInstance("/", "application/json");

export default marketClient;
