import React from 'react';
import { Form, Formik } from 'formik';
import { FieldType, FormField, SubmitHandler } from '../../components/Form';
import { useSessionId } from '../../utils/customHooks';
import Button from '../../components/Button';
import Text, { WithText } from '../../components/Text';
import { MessageId } from '../../lang';
import USER_ROLES from '../../constants/userRoles';
import validationSchema from './validationSchema';

export interface JoinSessionFormData {
  sessionId: string;
  name: string;
  role: string;
}

type Props = WithText;

const JoinSessionPage: React.FC<Props> = ({ getText }) => {
  const sessionId = useSessionId();

  const initialValues: JoinSessionFormData =
      { sessionId: sessionId || '', name: '', role: '' };

  const roles = USER_ROLES.map((role) =>
    ({ ...role, name: getText(role.name as MessageId) }));

  const handleSubmit: SubmitHandler<JoinSessionFormData> = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema(getText)}
    >
      {({ isSubmitting, errors }) => (
        <Form>
          <FormField
            name="sessionId"
            type={FieldType.Input}
            error={errors.sessionId}
            label={<Text id="session.id" />}
          />
          <FormField
            name="name"
            type={FieldType.Input}
            error={errors.name}
            label={<Text id="user.name" />}
          />
          <FormField
            name="role"
            type={FieldType.Select}
            label={<Text id="user.role" />}
            emptyOptionText={getText('user.role.placeholder')}
            options={roles}
          />
          <Button type="submit" disabled={isSubmitting}>
            <Text id="session.join" />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default JoinSessionPage;
