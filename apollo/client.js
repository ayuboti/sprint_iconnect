import ApolloLinkTimeout from 'apollo-link-timeout';
import {ApolloClient} from 'apollo-client';
import {ApolloLink, concat} from 'apollo-link';
import {onError} from "apollo-link-error";
import {BatchHttpLink} from "apollo-link-batch-http";
import fetch from 'isomorphic-unfetch';
import {initCache} from './lib/init-cache';
import resolvers from "./resolvers";
import types from "./types";
import {GRAPHQL_ENDPOINT} from "../_constants";
import router from "next/router";

global.fetch = fetch;


export default function createApolloClient(initialState, ctx) {
  // batch Http Link object
  let batchHttpLink = new BatchHttpLink({
    uri: GRAPHQL_ENDPOINT, // set graphql endpoint
    credentials: 'include',// set credentials like include
    connectToDevTools: process.env.NODE_ENV !== 'production', // if in development connect to Dev tools
    queryDeduplication: true, // set query deduplication to true
  });

  // create an authentication middleware
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add authorization headers in the browser only
    if (!Boolean(ctx)) {
      // get authorization header from the local storage
      let access_token = window.localStorage.getItem('access_token');
      // set authorization headers
      operation.setContext(({headers = {}}) => ({
        headers: {
          ...headers,
          authorization: access_token ? `Bearer ${access_token}` : "",
        }
      }));
    }

    return forward(operation);
  });

  const authErrorLink = onError(({networkError}) => {
    if (!Boolean(ctx) && networkError) {
        if (networkError.statusCode === 401) {
          window.localStorage.removeItem('access_token')
          router.reload()
        }
    }
  });

  batchHttpLink = authErrorLink.concat(batchHttpLink)
  // if in server environment
  if (Boolean(ctx)) {
    // initialize error Link to handle Errors
    const timeOutErrorLink = onError(({networkError}) => {
      if (Boolean(ctx)) {
        if (networkError.statusCode === 408)
          console.log("taken too long to respond")
      }
    });
    // set the timeOut link
    const timeoutLink = new ApolloLinkTimeout(5000); // 5 second timeout
    // combine the batchHttpLink with the concat
    batchHttpLink = timeOutErrorLink.concat(timeoutLink.concat(batchHttpLink));
    console.info("batch link sent to the server");
  }

  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    cache: initCache(initialState),
    shouldBatch: true,
    link: concat(
      authMiddleware,
      batchHttpLink
    ),
    typeDefs: types,
    resolvers
  });
}
