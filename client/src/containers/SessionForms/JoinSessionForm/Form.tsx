import React, { ChangeEvent, FocusEvent, FormEvent, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Form } from 'formik';
import { FormProps } from 'utils/form/types';
import { FieldSize, FieldType, FormField } from 'components/Form';
import AvatarSelector from 'containers/AvatarSelector';
import Button, { ButtonVariant } from 'components/Button/Button';
import { useMappedDispatch, useSessionFormUtils, useText } from 'utils/customHooks';
import { getSessionInfo } from 'state/session/sessionActions';
import { getNormalizedSessionRoles } from 'state/session/sessionStateGetters';
import { SessionFormData } from '../types';
import styles from '../SessionForms.module.scss';

const cx = classNames.bind(styles);

const actions = {
  getInfo: getSessionInfo,
};

type Props = FormProps<SessionFormData>;

const JoinSessionForm: React.FC<Props> = (props) => {
  const {
    errors,
    isSubmitting,
    setFieldValue,
    handleBlur,
    values,
    submitForm,
    setFieldError,
  } = props;

  const { getInfo } = useMappedDispatch(actions);
  const roles = useSelector(getNormalizedSessionRoles);
  const text = useText();

  const {
    submitDisabled,
    getErrorText,
  } = useSessionFormUtils(errors, values.role, setFieldValue, isSubmitting);

  const handleSessionFieldChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFieldValue('sessionId', e.target.value.trimStart());
  };

  const handleNameFieldChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFieldValue('name', e.target.value.trimStart());
  };

  const handleSessionFieldBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    if (!value) {
      handleBlur(e);
      return;
    }

    getInfo(e.target.value, { setFieldValue, setFieldError });
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    submitDisabled || submitForm();
  };

  useEffect(() => {
    if (values.sessionId) {
      getInfo(values.sessionId, { setFieldValue, setFieldError });
    }
  }, []);

  return (
    <Form onSubmit={onFormSubmit} noValidate>
      <FormField
        name="sessionId"
        type={FieldType.Input}
        error={getErrorText(errors.sessionId)}
        label={text('session.field.id.label')}
        onChange={handleSessionFieldChange}
        fieldSize={FieldSize.Large}
        placeholder={text('session.field.id.placeholder')}
        block
        onBlur={handleSessionFieldBlur}
      />
      <FormField
        name="name"
        type={FieldType.Input}
        error={getErrorText(errors.name)}
        label={text('session.field.name.label')}
        fieldSize={FieldSize.Large}
        placeholder={text('session.field.name.placeholder')}
        block
        onChange={handleNameFieldChange}
        className={cx('input')}
        onBlur={handleBlur}
      >
        <AvatarSelector className={cx('avatar-selector')} />
      </FormField>
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
      <Button variant={ButtonVariant.Primary} colored type="submit" disabled={submitDisabled}>
        {text('session.join')}
      </Button>
    </Form>
  );
};

export default JoinSessionForm;
