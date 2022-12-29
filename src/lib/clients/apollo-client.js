import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const httpEndpoint = process.env.NEXT_PUBLIC_VECINO_MARKET_API_URL + "/graphql";

const uploadLink = createUploadLink({
  uri: httpEndpoint,
});

const httpLink = createHttpLink({
  uri: httpEndpoint,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: "Bearer " + process.env.NEXT_PUBLIC_VECINO_MARKET_API_KEY,
    },
  };
});

const newApolloLink = ApolloLink.split(
  (operation) => !operation.getContext().clientName, // Default client

  authLink.concat(uploadLink),
  authLink.concat(httpLink)
  //     ? operation.getContext().hasUpload
  //     : operation.getContext().hasUpload,
  // uploadLink,
  // httpLink
);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  },
  mutate: {
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  // link: authLink.concat(newApolloLink),
  link: newApolloLink,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client;
