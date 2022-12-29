import ApiClientSingleton from "../apiClient.js";

const dbClient = ApiClientSingleton.getApiInstance(
  process.env.VECINO_MARKET_API_URL,
  "application/json",
  "Bearer " + process.env.VECINO_MARKET_API_KEY
);

export default dbClient;
