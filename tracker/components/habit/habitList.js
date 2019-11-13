import Habit from "./habit";

const HabitList = ({ habits }) => {
  return (
    <section>
      <h2>My Habits</h2>
      {habits.map((habit, index) => (
        <Habit habit={habit} key={index} />
      ))}
    </section>
  );
};

export default HabitList;
