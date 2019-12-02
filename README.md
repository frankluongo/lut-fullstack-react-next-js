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
iimport ApolloClient from "apollo-boost";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import { InMemoryCache } from "apollo-cache-inmemory";

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  WithApollo.getInitialProps = async ctx => {
    const { AppTree } = ctx;
    const apolloClient = (ctx.apollClient = initApolloClient());

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    // If on server
    if (typeof window === "undefined") {
      if (ctx.res && ctx.res.finished) {
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
      } catch (e) {
        console.error(e);
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
  const ssrMode = typeof window === "undefined";
  const cache = new InMemoryCache().restore(initialState);

  const client = new ApolloClient({
    ssrMode,
    uri: "http://localhost:3000/api/graphql",
    fetch,
    cache
  });
  return client;
};
```

## 09: Apollo Client Part 3 - 3rd Party API's

## 10: Developing Our Interface

### components/habit/habit.js

```js
import HabitButton from "./habitButton";

const Habit = () => {
  return (
    <article>
      <h3>Habit Title</h3>
      <div>
        <HabitButton />
        <HabitButton />
        <HabitButton />
        <HabitButton />
        <HabitButton />
        <HabitButton />
        <HabitButton />
        <HabitButton />
      </div>
    </article>
  );
};

export default Habit;
```

### components/habit/habitButton.js

```js
import { useState } from "react";

const HabitButton = () => {
  const [complete, setComplete] = useState(false);
  const indicator = complete ? "x" : "o";

  function handleClick() {
    setComplete(!complete);
  }

  return <button onClick={handleClick.bind(this)}>{indicator}</button>;
};

export default HabitButton;
```

### components/habit/habitList.js

```js
import Habit from "./habit";

const HabitList = () => {
  return (
    <section>
      <h2>My Habits</h2>
      <Habit />
      <Habit />
      <Habit />
    </section>
  );
};

export default HabitList;
```

## 11: Habits Form

```bash
yarn add @leveluptuts/fresh
```

### components/habits/habitButton

```js
import HabitButton from "./habitButton";

const Habit = ({ habit }) => {
  const dates = getLast5Days();
  console.log(dates);
  return (
    <article>
      <h3>{habit}</h3>
      <div>
        {dates.map((date, index) => (
          <HabitButton date={date} key={index} />
        ))}
      </div>
    </article>
  );
};

function getLast5Days() {
  const dates = "01234".split("").map(day => {
    const tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - day);
    return tempDate;
  });
  return dates;
}

export default Habit;
```

## 12: CSS in NextJS

## 13: DotEnv In NextJS

```bash
yarn add dotenv
```

## 14: Setting Up MongoDB

```bash
yarn add mongoose
```

## 15: Our GraphQL API

Created files in api folder

## 16: Connecting Our API To Apollo Server

Connected files in api folder to `graphql.js1 file

## 17: Apollo Hooks To Query Data

Used a query in `HabitList.js` to fetch real todos from our database!

## 18: Writing To Our DB With a Mutation

## 19: Querying From The Database

## 20 Our Habit Events

## 21: Error States

## 22: Adding Events To The Database

## 23: NOW Hosting & Pitfalls

## 24: Where To Go From Here

[1]: https://www.leveluptutorials.com/tutorials/fullstack-react-with-nextjs
