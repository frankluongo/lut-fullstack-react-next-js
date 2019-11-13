import { useState } from "react";

const HabitButton = () => {
  const [complete, setComplete] = useState(false);
  const indicator = complete ? "x" : "o";

  function handleClick() {
    setComplete(!complete);
  }

  return <button onClick={handleClick.bind(this)}>{indicator}</button>;
};

export default HabitButton;
