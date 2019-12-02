import { Form, Field } from "@leveluptuts/fresh";
import { useMutation } from "@apollo/react-hooks";
import AddHabit from "./AddHabit.graphql";

const HabitForm = () => {
  const [addHabit] = useMutation(AddHabit);

  return (
    <Form onSubmit={handleSubmit.bind(this)}>
      <Field>Habit</Field>
    </Form>
  );

  function handleSubmit(data) {
    addHabit({
      variables: {
        habit: {
          name: data.habit
        }
      }
    });
  }
};

export default HabitForm;
