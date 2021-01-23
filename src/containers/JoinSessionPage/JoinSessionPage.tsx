import React from 'react';
import { Formik, Form } from 'formik';
import { Input, Label, SubmitHandler } from '../../components/Form';
import { useSessionId } from '../../utils/customHooks';
import Button from '../../components/Button';
import Text from '../../components/Text';

interface FormData {
  sessionId: string;
  name: string;
}

const JoinSessionPage: React.FC = () => {
  const sessionId = useSessionId();
  const initialValues: FormData = { sessionId: sessionId || '', name: '' };

  const handleSubmit: SubmitHandler<FormData> = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Label htmlFor="sessionId">
            <Text id="session.id" />
          </Label>
          <Input name="sessionId" />
          <Label htmlFor="name">
            <Text id="user.name" />
          </Label>
          <Input name="name" />
          <Button type="submit" disabled={isSubmitting}>
            <Text id="session.join" />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default JoinSessionPage;
