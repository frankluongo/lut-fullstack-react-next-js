export const habitsResolvers = {
  Query: {
    async habits() {
      console.log("Habits");
      return [
        {
          _id: "sumefunkyId",
          name: "Make my bed"
        }
      ];
    }
  }
};
