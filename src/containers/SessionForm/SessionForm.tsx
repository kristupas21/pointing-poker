import React from 'react';
import { Form, Formik } from 'formik';
import { SchemaOf } from 'yup';
import isEmpty from 'lodash/isEmpty';
import { FieldType, FormField, SubmitHandler, FieldSize } from 'components/Form';
import Button from 'components/Button';
import { UserRole } from 'utils/userRoles/types';
import { useText } from 'utils/customHooks';
import { CustomFormError, CustomFormErrors } from 'globalTypes';
import { SessionFormData } from './types';

type Props = {
  isJoinType?: boolean;
  initialValues: SessionFormData;
  onSubmit: (values: SessionFormData, ...args: any) => void;
  roles: UserRole[];
  validationSchema: SchemaOf<SessionFormData>;
};

const SessionForm: React.FC<Props> = (props) => {
  const { isJoinType = false, initialValues, onSubmit, validationSchema, roles } = props;
  const text = useText();
  const getErrorText = (e: CustomFormError) => e?.id && text(e.id, e.values);

  const handleSubmit: SubmitHandler<SessionFormData> = (
    values,
    { setFieldError, setSubmitting }
  ) => {
    onSubmit(values, setFieldError, setSubmitting);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      id="create-session-form"
    >
      {({
        isSubmitting,
        errors: err,
        values,
        setValues,
        setFieldValue,
        submitForm
      }) => {
        const errors = err as unknown as CustomFormErrors<SessionFormData>;
        const submitDisabled = isSubmitting || !isEmpty(errors);

        const handleSessionFieldChange = (e) => {
          const newValues = {
            ...values,
            ...(values.useRoles && { useRoles: false, role: '' }),
            sessionId: e.target.value,
          };

          setValues(newValues);
        };

        if (values.role && !roles.some((r) => r.id === values.role)) {
          setValues({
            ...values,
            role: '',
          });
        }

        const onFormSubmit = (e) => {
          e.preventDefault();
          submitDisabled || submitForm();
        };

        return (
          <Form onSubmit={onFormSubmit}>
            {isJoinType && (
              <FormField
                name="sessionId"
                type={FieldType.Input}
                error={getErrorText(errors.sessionId)}
                label={text('session.field.id.label')}
                onChange={handleSessionFieldChange}
                fieldSize={FieldSize.Large}
                placeholder={text('session.field.id.placeholder')}
                isBlock
              />
            )}
            <FormField
              name="name"
              type={FieldType.Input}
              error={getErrorText(errors.name)}
              label={text('session.field.name.label')}
              fieldSize={FieldSize.Large}
              placeholder={text('session.field.name.placeholder')}
              isBlock
            />
            {isJoinType || (
              <FormField
                name="useRoles"
                type={FieldType.Checkbox}
                label={text('session.field.useRoles.label')}
                isBlock
              />
            )}
            <FormField
              name="role"
              type={FieldType.Select}
              label={text('session.field.role.label')}
              placeholder={text('session.field.role.placeholder')}
              error={getErrorText(errors.role)}
              options={roles}
              disabled={values.isObserver}
              isBlock
              value={values.role}
              fieldSize={FieldSize.Large}
              setFieldValue={setFieldValue}
            />
            <FormField
              name="isObserver"
              type={FieldType.Checkbox}
              label={text('session.field.observer.label')}
              isBlock
            />
            <Button type="submit" disabled={submitDisabled}>
              {text(isJoinType ? 'session.join' : 'session.start')}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SessionForm;
