import HabitButton from "./habitButton";

const Habit = ({ habit }) => {
  const dates = getLast5Days();
  return (
    <>
      <article>
        <h3>{habit.name}</h3>
        <div>
          {dates.map((date, index) => (
            <HabitButton date={date} key={index} />
          ))}
        </div>
      </article>
      <style jsx>{`
        article {
          margin-bottom: 2rem;
          padding: 1rem;

          box-shadow: 0 1px 8px 2px rgba(0, 0, 0, 0.15);
        }

        h3 {
          display: block;
          margin-bottom: 1rem;
          padding-bottom: 1rem;

          text-transform: capitalize;

          border-bottom: 1px solid red;
        }

        div {
          display: flex;
        }
      `}</style>
    </>
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
