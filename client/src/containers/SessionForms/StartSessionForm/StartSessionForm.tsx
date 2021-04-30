import React from 'react';
import { Formik } from 'formik';
import { FormProps } from 'utils/form/types';
import { useSelector } from 'react-redux';
import {
  getSessionUsePermissions,
  getSessionUserIsObserver,
  getSessionUserName,
  getSessionUseRoles
} from 'state/session/sessionStateGetters';
import { useMappedDispatch } from 'utils/customHooks';
import {
  startSession as startSessionAction
} from 'state/session/sessionActions';
import { makeInitialUserRoleSelector } from 'utils/selectors';
import { SessionFormData } from '../types';
import { startSessionValidationSchema } from '../validationSchema';
import StartSessionFormFields from './StartSessionFormFields';

const actions = {
  startSession: startSessionAction,
};

const initialUserRoleSelector = makeInitialUserRoleSelector();

const StartSessionForm: React.FC = () => {
  const name = useSelector(getSessionUserName);
  const role = useSelector(initialUserRoleSelector);
  const isObserver = useSelector(getSessionUserIsObserver);
  const useRoles = useSelector(getSessionUseRoles);
  const usePermissions = useSelector(getSessionUsePermissions);
  const { startSession } = useMappedDispatch(actions);

  const handleSubmit = (values: SessionFormData) => {
    startSession(startSessionValidationSchema.cast(values));
  };

  const initialValues: SessionFormData = {
    name,
    role,
    isObserver,
    useRoles,
    usePermissions,
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={false}
      onSubmit={handleSubmit}
      validationSchema={startSessionValidationSchema}
      id="start-session-form"
    >
      {(formikProps: FormProps<SessionFormData>) => <StartSessionFormFields {...formikProps} />}
    </Formik>
  );
};

export default StartSessionForm;
