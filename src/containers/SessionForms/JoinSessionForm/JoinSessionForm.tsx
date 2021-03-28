import React from 'react';
import { Form, Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { FieldSize, FieldType, FormField, SubmitHandler } from 'components/Form';
import Button from 'components/Button';
import { UserRole } from 'utils/userRoles/types';
import { useMappedDispatch, useText } from 'utils/customHooks';
import { CustomFormError, CustomFormErrors } from 'globalTypes';
import { getSessionInfo } from 'state/session/sessionActions';
import storageService, { StorageKey } from 'utils/storageService';
import { SessionFormData, SessionFormSubmitHandler } from '../types';
import { joinSessionValidationSchema } from '../validationSchema';

const actions = {
  getInfo: getSessionInfo,
};

type Props = {
  initialValues: SessionFormData;
  onSubmit: SessionFormSubmitHandler;
  roles: UserRole[];
};

const JoinSessionForm: React.FC<Props> = (props) => {
  const { initialValues, onSubmit, roles } = props;
  const { getInfo } = useMappedDispatch(actions);
  const text = useText();
  const getErrorText = (e: CustomFormError) => e?.id && text(e.id, e.values);

  const handleSubmit: SubmitHandler<SessionFormData> = (
    values,
    { setSubmitting }
  ) => onSubmit(values, setSubmitting);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={joinSessionValidationSchema}
      id="join-session-form"
    >
      {({
        isSubmitting,
        errors: formikErrors,
        values,
        setFieldValue,
        handleBlur,
        setSubmitting,
        submitForm,
        handleChange,
      }) => {
        const storageErrors = storageService.get(StorageKey.FormErrors) || {};

        const errors = {
          ...formikErrors,
          ...storageErrors,
        } as CustomFormErrors<SessionFormData>;

        const submitDisabled = isSubmitting || !isEmpty(errors);

        const handleSessionFieldChange = (e) => {
          storageService.removeNested(StorageKey.FormErrors, 'sessionId');
          handleChange(e);
        };

        const handleSessionFieldBlur = (e) => {
          if (e.target.value) {
            storageService.set(StorageKey.FormValues, values);
            setSubmitting(true);

            const callback = () => {
              setSubmitting(false);
              handleBlur(e);
            };

            getInfo(e.target.value, callback);
          } else {
            handleBlur(e);
          }
        };

        if (values.role && !roles.some((r) => r.id === values.role)) {
          setFieldValue('role', '');
        }

        const onFormSubmit = (e) => {
          e.preventDefault();
          submitDisabled || submitForm();
        };

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
              isBlock
              onBlur={handleSessionFieldBlur}
            />
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
              {text('session.join')}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default JoinSessionForm;
