import React from 'react';
import { Form, Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { FieldSize, FieldType, FormField, SubmitHandler } from 'components/Form';
import Button from 'components/Button';
import { UserRole } from 'utils/userRoles/types';
import { useText } from 'utils/customHooks';
import { CustomFormError, CustomFormErrors } from 'globalTypes';
import { SessionFormData } from '../types';
import { startSessionValidationSchema } from '../validationSchema';

type Props = {
  initialValues: SessionFormData;
  onSubmit: SubmitHandler<SessionFormData>;
  roles: UserRole[];
};

const StartSessionForm: React.FC<Props> = (props) => {
  const { initialValues, onSubmit, roles } = props;
  const text = useText();
  const getErrorText = (e: CustomFormError) => e?.id && text(e.id, e.values);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={startSessionValidationSchema}
      id="start-session-form"
    >
      {({
        isSubmitting,
        errors: formikErrors,
        values,
        setValues,
        setFieldValue,
        submitForm
      }) => {
        const errors = formikErrors as unknown as CustomFormErrors<SessionFormData>;
        const submitDisabled = isSubmitting || !isEmpty(errors);

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
          <Form onSubmit={onFormSubmit} noValidate>
            <FormField
              name="name"
              type={FieldType.Input}
              error={getErrorText(errors.name)}
              label={text('session.field.name.label')}
              fieldSize={FieldSize.Large}
              placeholder={text('session.field.name.placeholder')}
              isBlock
            />
            <FormField
              name="useRoles"
              type={FieldType.Checkbox}
              label={text('session.field.useRoles.label')}
              isBlock
            />
            <FormField
              name="role"
              type={FieldType.Select}
              label={text('session.field.role.label')}
              placeholder={text('session.field.role.placeholder')}
              error={getErrorText(errors.role)}
              options={roles}
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
              {text('session.start')}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default StartSessionForm;
