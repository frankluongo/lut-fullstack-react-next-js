import Head from "next/head";
import fetch from "isomorphic-unfetch";
// import ApolloClient from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  withApollo.getInitialProps = async context => {
    const { AppTree } = context;
    const apolloClient = (context.apolloClient = initApolloClient());

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      PageProps = await PageComponent.getInitialProps(context);
    }

    if (typeof window === "undefined") {
      if (context.res && context.res.finished) {
        return pageProps;
      }

      try {
        const { getDataFromTree } = await import("@apollo/react-ssr");
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient
            }}
          />
        );
      } catch (error) {
        console.error(error);
      }

      Head.rewind();
    }

    const apolloState = apolloClient.cache.extract();

    return {
      ...pageProps,
      apolloState
    };
  };

  return WithApollo;
}

const initApolloClient = (initialState = {}) => {
  const cache = new InMemoryCache().restore(initialState);
  const link = new HttpLink({
    uri: "http://localhost:3000/api/graphql",
    fetch
  });
  const ssrMode = typeof window === "undefined";

  const client = new ApolloClient({
    ssrMode,
    link,
    cache
  });
  return client;
};
