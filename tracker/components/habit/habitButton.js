import { useMutation } from "@apollo/react-hooks";

import AddEvent from "./AddEvent.graphql";
import RemoveEvent from "./RemoveEvent.graphql";

const HabitButton = ({ date, habitId, events }) => {
  const [addEvent] = useMutation(AddEvent, {
    refetchQueries: ["getHabits"]
  });

  const [removeEvent] = useMutation(RemoveEvent, {
    refetchQueries: ["getHabits"]
  });

  const foundDate = events.find(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === date.getDate();
  });

  return (
    <>
      <section>
        <div>{`${date.getMonth() + 1}/ ${date.getDate()}`}</div>
        {foundDate ? (
          <button
            onClick={() => {
              removeEvent({
                variables: {
                  habitId,
                  eventId: foundDate._id
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
