import { ApolloServer, gql } from "apollo-server-micro";
import "../../lib/mongoose";

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
