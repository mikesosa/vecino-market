import qs from "qs";
import dbClient from "../clients/dbClient.js";

const getItems = async () => {
  const queryItems = qs.stringify(
    {
      populate: "*",
      // "populate[1]": "loanTicket.userId",
      // filters: {
      //   loanTicket: {
      //     userId: {
      //       id: { $eq: userId },
      //     },
      //   },
      // },
    },
    {
      encodeValuesOnly: false,
      encode: false,
    }
  );

  return await dbClient
    .get(`/api/items?${queryItems}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export default getItems;
