import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

import Habits from "./habits";

export const habitsResolvers = {
  Query: {
    async habits() {
      try {
        const habits = await Habits.find();
        return habits;
      } catch (e) {
        console.log(e);
      }
    }
  },

  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date Custom Scalar",
    parseValue(value) {
      return new Date(value); // value from client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.init) {
        return new Date(ast.value);
      }

      return null;
    }
  })
};
