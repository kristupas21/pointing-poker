import React from 'react';
import { Form, Formik } from 'formik';
import { SchemaOf } from 'yup';
import isEmpty from 'lodash/isEmpty';
import { FieldType, FormField, SubmitHandler, FieldSize } from 'components/Form';
import Button from 'components/Button';
import { UserRole } from 'utils/userRoles/types';
import { useText } from 'utils/customHooks';
import { CustomFormError, CustomFormErrors } from 'types/global';
import { CreateSessionFormData } from './types';

type Props = {
  isJoinType?: boolean;
  initialValues: CreateSessionFormData;
  onSubmit: (values: CreateSessionFormData) => void;
  roles: UserRole[];
  validationSchema: SchemaOf<CreateSessionFormData>;
};

const CreateSessionForm: React.FC<Props> = (props) => {
  const { isJoinType = false, initialValues, onSubmit, validationSchema, roles } = props;
  const text = useText();
  const getErrorText = (e: CustomFormError) => e?.id && text(e.id, e.values);

  const handleSubmit: SubmitHandler<CreateSessionFormData> = (values) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      id="create-session-form"
    >
      {({ isSubmitting, errors: err, values, setValues, setFieldValue }) => {
        const errors = err as unknown as CustomFormErrors<CreateSessionFormData>;

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

        return (
          <Form>
            {isJoinType && (
              <FormField
                name="sessionId"
                type={FieldType.Input}
                error={getErrorText(errors.sessionId)}
                label={text('session.field.id.label')}
                onChange={handleSessionFieldChange}
                size={FieldSize.Large}
                placeholder={text('session.field.id.placeholder')}
                isBlock
              />
            )}
            <FormField
              name="name"
              type={FieldType.Input}
              error={getErrorText(errors.name)}
              label={text('session.field.name.label')}
              size={FieldSize.Large}
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
            {values.useRoles && (
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
                size={FieldSize.Large}
                setFieldValue={setFieldValue}
              />
            )}
            <FormField
              name="isObserver"
              type={FieldType.Checkbox}
              label={text('session.field.observer.label')}
              isBlock
            />
            <Button type="submit" disabled={isSubmitting || !isEmpty(errors)}>
              {text(isJoinType ? 'session.join' : 'session.start')}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateSessionForm;
