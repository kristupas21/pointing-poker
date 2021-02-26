import React from 'react';
import { Form, Formik } from 'formik';
import { SchemaOf } from 'yup';
import { RouteChildrenProps } from 'react-router';
import { FieldType, FormField, SubmitHandler } from '../../components/Form';
import Button from '../../components/Button';
import { withText, WithText } from '../../components/Text';
import { MessageId } from '../../lang';
import USER_ROLES from '../../constants/userRoles';

export interface CreateSessionFormData {
  sessionId?: string;
  name: string;
  role?: string;
  isObserver: boolean;
  useRoles?: boolean;
}

type Props = WithText & RouteChildrenProps & {
  isJoinType?: boolean;
  initialValues: CreateSessionFormData;
  onSubmit: (values: CreateSessionFormData, fn: (v: boolean) => void) => void;
  validationSchema: SchemaOf<CreateSessionFormData>;
};

const JoinSessionPage: React.FC<Props> = (props) => {
  const { getText, isJoinType = false, initialValues, onSubmit, validationSchema } = props;

  const roles = USER_ROLES.map((role) =>
    ({ ...role, name: getText(role.name as MessageId) }));

  const handleSubmit: SubmitHandler<CreateSessionFormData> = (
    values,
    { setSubmitting }
  ) => onSubmit(values, setSubmitting);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, errors, values }) => (
        <Form>
          {isJoinType && (
            <FormField
              name="sessionId"
              type={FieldType.Input}
              error={errors.sessionId}
              label={getText('session.id')}
            />
          )}
          <FormField
            name="name"
            type={FieldType.Input}
            error={errors.name}
            label={getText('session.field.name.label')}
          />
          {isJoinType || (
            <FormField
              name="useRoles"
              type={FieldType.Checkbox}
              label={getText('session.field.useRoles.label')}
            />
          )}
          {values.useRoles && (
            <FormField
              name="role"
              type={FieldType.Select}
              label={getText('session.field.role.label')}
              emptyOptionText={getText('session.field.role.placeholder')}
              error={errors.role}
              options={roles}
              disabled={values.isObserver}
            />
          )}
          <FormField
            name="isObserver"
            type={FieldType.Checkbox}
            label={getText('session.field.observer.label')}
          />
          <Button type="submit" disabled={isSubmitting}>
            {getText(isJoinType ? 'session.join' : 'session.start')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default withText(JoinSessionPage);
