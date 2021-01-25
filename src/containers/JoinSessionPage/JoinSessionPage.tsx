import React from 'react';
import { Form, Formik } from 'formik';
import { FieldType, FormField, SubmitHandler } from '../../components/Form';
import { useSessionId } from '../../utils/customHooks';
import Button from '../../components/Button';
import { withText, WithText } from '../../components/Text';
import { MessageId } from '../../lang';
import USER_ROLES from '../../constants/userRoles';
import validationSchema from './validationSchema';

export interface JoinSessionFormData {
  sessionId: string;
  name: string;
  role: string;
  isObserver: boolean;
}

type Props = WithText;

const JoinSessionPage: React.FC<Props> = ({ getText }) => {
  const sessionId = useSessionId();

  const initialValues: JoinSessionFormData =
      { sessionId: sessionId || '', name: '', role: '', isObserver: false };

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
      {({ isSubmitting, errors, values }) => (
        <Form>
          <FormField
            name="sessionId"
            type={FieldType.Input}
            error={errors.sessionId}
            label={getText('session.id')}
          />
          <FormField
            name="name"
            type={FieldType.Input}
            error={errors.name}
            label={getText('session.field.name.label')}
          />
          <FormField
            name="role"
            type={FieldType.Select}
            label={getText('session.field.role.label')}
            emptyOptionText={getText('session.field.role.placeholder')}
            options={roles}
            disabled={values.isObserver}
          />
          <FormField
            name="isObserver"
            type={FieldType.Checkbox}
            label={getText('session.field.observer.label')}
          />
          <Button type="submit" disabled={isSubmitting}>
            {getText('session.join')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default withText(JoinSessionPage);
