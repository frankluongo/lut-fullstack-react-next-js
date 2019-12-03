import { useMutation } from "@apollo/react-hooks";

import AddEvent from "./AddEvent.graphql";
import RemoveEvent from "./RemoveEvent.graphql";

const HabitButton = ({ date, habitId }) => {
  const indicator = complete ? "x" : "o";

  const [addEvent] = useMutation(AddEvent, {
    refetchQueries: ["getHabits"]
  });

  const [removeEvent] = useMutation(RemoveEvent, {
    refetchQueries: ["getHabits"]
  });

  const found = false;

  return (
    <>
      <section>
        <div>{`${date.getMonth() + 1}/ ${date.getDate()}`}</div>
        {found ? (
          <button
            onClick={() => {
              removeEvent({
                variables: {
                  habitId,
                  eventId: "asdfdsgdfgfd"
                }
              });
            }}
          >
            x
          </button>
        ) : (
          <button
            onClick={() => {
              addEvent({
                variables: {
                  habitId,
                  date
                }
              });
            }}
          >
            o
          </button>
        )}
      </section>
      <style jsx>{`
        section {
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        div {
          margin-bottom: 1rem;
        }
        button {
          display: flex;
          justify-content: center;
          align-items: center;

          height: 2rem;
          width: 2rem;
          margin: 0;
          padding: 0;

          font-size: 1rem;

          border: 1px solid #ccc;
        }
      `}</style>
    </>
  );
};

export default HabitButton;
