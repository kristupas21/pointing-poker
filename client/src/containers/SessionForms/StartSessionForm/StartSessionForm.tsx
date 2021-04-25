import React, { ChangeEvent } from 'react';
import { Form, Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { FieldSize, FieldType, FormField, SubmitHandler } from 'components/Form';
import Button, { ButtonVariant } from 'components/Button';
import { useText } from 'utils/customHooks';
import classNames from 'classnames/bind';
import { CustomFormError, CustomFormErrors } from 'globalTypes';
import AvatarSelector from 'containers/AvatarSelector';
import storageService, { StorageKey } from 'utils/storageService';
import { SessionFormData } from '../types';
import { startSessionValidationSchema } from '../validationSchema';
import styles from '../SessionForms.module.scss';

const cx = classNames.bind(styles);

type Props = {
  initialValues: SessionFormData;
  onSubmit: (values: SessionFormData) => void;
  roles: string[];
};

const StartSessionForm: React.FC<Props> = (props) => {
  const { initialValues, onSubmit, roles } = props;
  const text = useText();
  const getErrorText = (e: CustomFormError) => e?.id && text(e.id, e.values);

  const handleSubmit: SubmitHandler<SessionFormData> = (values) => {
    onSubmit(startSessionValidationSchema.cast(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={startSessionValidationSchema}
      id="start-session-form"
    >
      {({
        isSubmitting,
        errors: formikErrors,
        values,
        setValues,
        setFieldValue,
        submitForm,
      }) => {
        const errors = formikErrors as unknown as CustomFormErrors<SessionFormData>;
        const submitDisabled = isSubmitting || !isEmpty(errors);

        const handleNameFieldChange = (e: ChangeEvent<HTMLInputElement>): void => {
          setFieldValue('name', e.target.value.trimStart());
        };

        if (values.role && !roles.some((r) => r === values.role)) {
          setValues({
            ...values,
            role: '',
          });
        }

        const handleUseRolesChange = (e: ChangeEvent<HTMLInputElement>): void => {
          setFieldValue('useRoles', e.target.checked);
          storageService.set(StorageKey.UseRoles, e.target.checked);
        };

        const handleUsePermissionsChange = (e: ChangeEvent<HTMLInputElement>): void => {
          setFieldValue('usePermissions', e.target.checked);
          storageService.set(StorageKey.UsePermissions, e.target.checked);
        };

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
              block
              className={cx('input')}
              onChange={handleNameFieldChange}
            >
              <AvatarSelector className={cx('avatar-selector')} />
            </FormField>
            <FormField
              name="useRoles"
              type={FieldType.Switch}
              label={text('session.field.useRoles.label')}
              onChange={handleUseRolesChange}
              block
            />
            <FormField
              name="role"
              type={FieldType.Select}
              label={text('session.field.role.label')}
              placeholder={text('session.field.role.placeholder')}
              error={getErrorText(errors.role)}
              options={roles}
              block
              value={values.role}
              fieldSize={FieldSize.Large}
              setFieldValue={setFieldValue}
            />
            <FormField
              name="isObserver"
              type={FieldType.Checkbox}
              label={text('session.field.observer.label')}
              block
            />
            <FormField
              name="usePermissions"
              type={FieldType.Switch}
              label={text('session.field.usePermissions.label')}
              onChange={handleUsePermissionsChange}
              block
            />
            <Button variant={ButtonVariant.Primary} colored type="submit" disabled={submitDisabled}>
              {text('session.start')}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default StartSessionForm;
