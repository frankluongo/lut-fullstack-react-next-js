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
