# Fullstack React With NextJS 9 by Level Up Tutorials

[Fullstack React With NextJS][1]

## 01: What is NextJS

NextJS is a JavaScript Framework for React that allows you to Server-Side Render React.

## 02: Getting Started With NextJS

```bash
npx create-next-app
cd tracker
yarn dev
```

## 03: Creating Pages

### pages/about.js

```jsx
import React from "react";
import Layout from "../components/layout";

const About = () => {
  return (
    <Layout>
      <div>
        <h1>About</h1>
      </div>
    </Layout>
  );
};

export default About;
```

### components/layout.js

```jsx
import Nav from "./nav";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main>{children}</main>
    </>
  );
};

export default Layout;
```

## 04: Links in NextJS

### components/nav.js

```jsx
<Link href="/about">
  <a>About</a>
</Link>
```

### events/[slug].js

```jsx
import { useRouter } from "next/router";
import Layout from "../../components/layout";

const Event = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Layout>
      <h1>{slug}</h1>
    </Layout>
  );
};

export default Event;
```

### events/index.js

```jsx
import Layout from "../../components/layout";

const Event = () => {
  return (
    <Layout>
      <h1>All Events</h1>
    </Layout>
  );
};

export default Event;
```

## 05: API Routes in NextJS 9

### pages/api/graphql.js

```js
// Shorthand
export default (req, res) => {
  res.status(200).json({
    test: "Hello Level Up!"
  });
};

// Long Way
// export default (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.statusCode = 200;
//   res.end(
//     JSON.stringify({
//       test: "Hello Level Up!"
//     })
//   );
// };
```

## 06: Setting Up Our Apollo Server

```bash
cd tracker && yarn add apollo-server-micro
```

### pages/api/graphql.js

```js
import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const resolvers = {
  Query: {
    sayHello: () => {
      return "Hello Level Up";
    }
  }
};

const ApolloMicroServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};

export default ApolloMicroServer.createHandler({ path: "/api/graphql" });
```

## 07: Apollo Client Part 1

```bash
cd tracker && yarn add @apollo/react-hooks apollo-boost
cd tracker && yarn add graphql-tag
cd tracker && isomorphic-unfetch
```

### lib/apollo.js

```js
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";

export function withApollo(PageComponent) {
  const WithApollo = props => {
    const client = new ApolloClient({
      uri: "http://localhost:3000/api/graphql",
      fetch
    });

    return (
      <ApolloProvider client={client}>
        <PageComponent {...props} />
      </ApolloProvider>
    );
  };
  return WithApollo;
}
```

### pages/index.js

```js
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../lib/apollo";

const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(HELLO_QUERY);
  if (loading) return <div />;
  return (
  ...
export default withApollo(Home);
```

## 08: Apollo Client Part 2 - SSR

```bash
cd tracker && yarn add apollo-client apollo-cache-inmemory apollo-link-http
```

### lib/apollo.js

```js
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
```

## 09: Apollo Client Part 3 - 3rd Party API's

## 10: Developing Our Interface

## 11: Habits Form

## 12: CSS in NextJS

## 13: DotEnv In NextJS

## 14: Setting Up MongoDB

## 15: Our GraphQL API

## 16: Connecting Our API To Apollo Server

## 17: Apollo Hooks To Query Data

## 18: Writing To Our DB With a Mutation

## 19: Querying From The Database

## 20 Our Habit Events

## 21: Error States

## 22: Adding Events To The Database

## 23: NOW Hosting & Pitfalls

## 24: Where To Go From Here

[1]: https://www.leveluptutorials.com/tutorials/fullstack-react-with-nextjs
