import React from 'react';
import { Formik, Form } from 'formik';
import { Input, Label, Option, Select, SubmitHandler } from '../../components/Form';
import { useSessionId } from '../../utils/customHooks';
import Button from '../../components/Button';
import Text, { getText } from '../../components/Text';
import { Identifier } from '../../types/global';
import USER_ROLES from '../../constants/userRoles';
import { MessageId } from '../../lang';

interface FormData {
  sessionId: string;
  name: string;
  role: string;
}

const JoinSessionPage: React.FC = () => {
  const sessionId = useSessionId();
  const initialValues: FormData = { sessionId: sessionId || '', name: '', role: '' };

  const handleSubmit: SubmitHandler<FormData> = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  const renderOption = (item: Identifier) => (
    <Option value={item.id} key={item.id}>
      {getText(item.name as MessageId)}
    </Option>
  );

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
          <Label htmlFor="role">
            <Text id="user.role" />
          </Label>
          <Select name="role">
            <Option value="" disabled>
              {getText('user.role.placeholder')}
            </Option>
            {USER_ROLES.map(renderOption)}
          </Select>
          <Button type="submit" disabled={isSubmitting}>
            <Text id="session.join" />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default JoinSessionPage;
