import { useQuery } from "@apollo/react-hooks";
import GetHabits from "./GetHabits.graphql";

import Habit from "./habit";

const HabitList = () => {
  const { data, loading, error } = useQuery(GetHabits);

  if (loading) return <secton>Loading Habits...</secton>;

  if (error)
    return <section>Oh No! There was an error getting your habit list</section>;

  const { habits } = data;

  return (
    <section>
      <h2>My Habits</h2>
      {habits.map(habit => (
        <Habit habit={habit} key={habit._id} />
      ))}
    </section>
  );
};

export default HabitList;
