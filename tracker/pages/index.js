import React, { useState } from "react";
import Layout from "../components/layout";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withApollo } from "../lib/apollo";
import HabitList from "../components/habit/habitList";
import HabitForm from "../components/habit/habitForm";

const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(HELLO_QUERY);
  const [habits, setHabits] = useState(["do the dishes"]);
  if (loading) return <div />;
  return (
    <Layout>
      <div>
        <div className="hero">
          <h1 className="title">{data.sayHello}</h1>
          <div className="list">
            <HabitForm formSubmitAction={setHabits} />
            <HabitList habits={habits} />
          </div>
        </div>

        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
          .row {
            max-width: 880px;
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .card {
            padding: 18px 18px 24px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
          .list {
            width: 100%;
            max-width: 40rem;
            margin: 0 auto;
            padding: 1rem;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default withApollo(Home);
