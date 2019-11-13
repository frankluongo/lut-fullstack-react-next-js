import { Form, Field } from "@leveluptuts/fresh";

const HabitForm = ({ formSubmitAction }) => {
  function handleSubmit(data) {
    formSubmitAction(prevState => [...prevState, data.habit]);
  }

  return (
    <Form onSubmit={handleSubmit.bind(this)}>
      <Field>Habit</Field>
    </Form>
  );
};

export default HabitForm;
