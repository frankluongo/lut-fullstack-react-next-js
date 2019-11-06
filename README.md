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

```js
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

```js
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

## 05: API Routes in NextJS 9

## 06: Setting Up Our Apollo Server

## 07: Apollo Client Part 1

## 08: Apollo Client Part 2 - SSR

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
