import React, { ChangeEvent } from 'react';
import { Form } from 'formik';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import storageService from 'utils/storageService/storageService';
import { StorageKey } from 'utils/storageService';
import { FieldSize, FieldType, FormField } from 'components/Form';
import AvatarSelector from 'containers/AvatarSelector';
import Button, { ButtonVariant } from 'components/Button/Button';
import { FormProps } from 'utils/form/types';
import { useSessionFormUtils, useText } from 'utils/customHooks';
import { makeNormalizedSessionRolesSelector } from 'utils/selectors';
import { SessionFormData } from '../types';
import styles from '../SessionForms.module.scss';

const cx = classNames.bind(styles);

const normalizedSessionRolesSelector = makeNormalizedSessionRolesSelector();

type Props = FormProps<SessionFormData>;

const StartSessionForm: React.FC<Props> = (props) => {
  const {
    isSubmitting,
    setFieldValue,
    values,
    errors,
    submitForm,
  } = props;

  const roles = useSelector(normalizedSessionRolesSelector);
  const text = useText();

  const {
    submitDisabled,
    getErrorText,
  } = useSessionFormUtils(errors, values.role, setFieldValue, isSubmitting);

  const handleNameFieldChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFieldValue('name', e.target.value.trimStart());
  };

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
    <Form className={cx('form', 'form--start')} onSubmit={onFormSubmit} noValidate>
      <FormField
        name="name"
        type={FieldType.Input}
        error={getErrorText(errors.name)}
        label={text('session.field.name.label')}
        fieldSize={FieldSize.Large}
        placeholder={text('session.field.name.placeholder')}
        block
        classes={{ wrapper: cx('input') }}
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
        classes={{ wrapper: cx('form__switch') }}
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
        disabled={!values.useRoles}
      />
      <FormField
        name="isObserver"
        type={FieldType.Switch}
        label={text('session.field.observer.label')}
        block
        classes={{ wrapper: cx('form__switch', 'form__switch--observer') }}
      />
      <FormField
        name="usePermissions"
        type={FieldType.Switch}
        label={text('session.field.usePermissions.label')}
        onChange={handleUsePermissionsChange}
        block
        classes={{ wrapper: cx('form__switch') }}
      />
      <Button
        variant={ButtonVariant.Primary}
        className={cx('submit-button')}
        colored
        type="submit"
        disabled={submitDisabled}
      >
        {text('session.start')}
      </Button>
    </Form>
  );
};

export default StartSessionForm;
