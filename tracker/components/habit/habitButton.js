import { useMutation } from "@apollo/react-hooks";

import AddEvent from "./AddEvent.graphql";
import RemoveEvent from "./RemoveEvent.graphql";

const HabitButton = ({ date }) => {
  const [complete, setComplete] = useState(false);
  const indicator = complete ? "x" : "o";

  function handleClick() {
    setComplete(!complete);
  }

  return (
    <>
      <section>
        <div>{`${date.getMonth() + 1}/ ${date.getDate()}`}</div>
        <button onClick={handleClick.bind(this)}>{indicator}</button>
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
