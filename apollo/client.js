import ApolloLinkTimeout from 'apollo-link-timeout';
import {ApolloClient} from 'apollo-client'
import {ApolloLink, concat, split} from 'apollo-link';
import {onError} from "apollo-link-error";
import {BatchHttpLink} from "apollo-link-batch-http";

import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies'
import cookie from 'js-cookie';
import {initCache} from './lib/init-cache'
import resolvers from "./resolvers";
import types from "./types"
import {GRAPHQL_ENDPOINT} from "../_constants";

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
    // get the authorization token from cookies
    let token = cookie.get('token');

    // if in server environment
    if (Boolean(ctx)) {
      // get token from cookie in request
      token = nextCookie(ctx).token;
    }
    // set request headers
    operation.setContext(({headers = {}}) => ({
      headers: {
        ...headers,
        authorization: token ? `Token ${token}` : "",
      }
    }));
    return forward(operation);
  });

  // initialize error Link to handle Errors
  const errorLink = onError(({networkError}) => {
    if (Boolean(ctx)) {
      if (networkError.statusCode === 408)
        console.log("taken too long to respond")
    }
  });

  // if in server environment
  if (Boolean(ctx)) {
    // set the timeOut link
    const timeoutLink = new ApolloLinkTimeout(5000); // 5 second timeout
    // combine the batchHttpLink with the concat
    batchHttpLink = errorLink.concat(timeoutLink.concat(batchHttpLink));
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
    types,
    resolvers
  });
}