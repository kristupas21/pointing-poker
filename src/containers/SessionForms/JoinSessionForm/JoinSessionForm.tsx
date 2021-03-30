import React, { ChangeEvent, FocusEvent, FormEvent, useEffect } from 'react';
import { Form, Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { FieldSize, FieldType, FormField, SubmitHandler } from 'components/Form';
import Button from 'components/Button';
import { useMappedDispatch, useText } from 'utils/customHooks';
import { CustomFormError, CustomFormErrors } from 'globalTypes';
import { getSessionInfo } from 'state/session/sessionActions';
import storageService, { StorageKey } from 'utils/storageService';
import { useSelector } from 'react-redux';
import { getSessionFormLoading } from 'state/session/sessionStateGetters';
import { SessionFormData } from '../types';
import { joinSessionValidationSchema } from '../validationSchema';

const actions = {
  getInfo: getSessionInfo,
};

type Props = {
  initialValues: SessionFormData;
  onSubmit: SubmitHandler<SessionFormData>;
  roles: string[];
};

const JoinSessionForm: React.FC<Props> = (props) => {
  const { initialValues, onSubmit, roles } = props;
  const isLoading = useSelector(getSessionFormLoading);
  const { getInfo } = useMappedDispatch(actions);
  const text = useText();
  const getErrorText = (e: CustomFormError) => e?.id && text(e.id, e.values);

  useEffect(() => {
    if (initialValues.sessionId) {
      getInfo(initialValues.sessionId);
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={joinSessionValidationSchema}
      id="join-session-form"
    >
      {({
        isSubmitting,
        errors: formikErrors,
        values,
        setFieldValue,
        handleBlur,
        submitForm,
        handleChange
      }) => {
        const errors = {
          ...formikErrors,
          ...(storageService.get(StorageKey.FormErrors) || {}),
        } as CustomFormErrors<SessionFormData>;

        const submitDisabled = isLoading || isSubmitting || !isEmpty(errors);

        const handleSessionFieldChange = (e: ChangeEvent<HTMLInputElement>): void => {
          storageService.remove(StorageKey.FormErrors);
          handleChange(e);
        };

        const handleNameFieldChange = (e: ChangeEvent<HTMLInputElement>): void => {
          storageService.removeNested(StorageKey.FormErrors, 'name');
          handleChange(e);
        };

        const handleSessionFieldBlur = (e: FocusEvent<HTMLInputElement>): void => {
          const { value } = e.target;

          if (!value) {
            handleBlur(e);
            return;
          }

          storageService.set<SessionFormData>(StorageKey.FormValues, values);
          getInfo(e.target.value, () => handleBlur(e));
        };

        if (values.role && !roles.some((r) => r === values.role)) {
          setFieldValue('role', '');
        }

        const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
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
              onChange={handleNameFieldChange}
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
              {text('session.join')}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default JoinSessionForm;
