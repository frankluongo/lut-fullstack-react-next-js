import { useState } from "react";

const HabitButton = ({ date }) => {
  const [complete, setComplete] = useState(false);
  const indicator = complete ? "x" : "o";

  function handleClick() {
    setComplete(!complete);
  }

  return (
    <div>
      <div>{`${date.getMonth() + 1}/ ${date.getDate()}`}</div>
      <button onClick={handleClick.bind(this)}>{indicator}</button>;
    </div>
  );
};

export default HabitButton;
