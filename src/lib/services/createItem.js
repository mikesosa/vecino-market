import dbClient from "../clients/dbClient.js";

const createItem = async (payload) => {
  console.log("payload", payload, dbClient);
  return await dbClient
    .post("/api/items", { data: { ...payload } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export default createItem;
