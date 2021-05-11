import React from 'react';
import { Formik } from 'formik';
import { FormProps } from 'utils/form/types';
import { useSelector } from 'react-redux';
import {
  joinSession as joinSessionAction,
} from 'state/session/sessionActions';
import {
  getSessionCurrentId,
  getSessionUserIsObserver,
  getSessionUserName,
} from 'state/session/sessionStateGetters';
import { useMappedDispatch, useSessionId } from 'utils/customHooks';
import { makeInitialUserRoleSelector } from 'utils/selectors';
import { SessionFormData } from '../types';
import { joinSessionValidationSchema } from '../validationSchema';
import JoinSessionFormFields from './JoinSessionFormFields';

const actions = {
  joinSession: joinSessionAction,
};

const initialUserRoleSelector = makeInitialUserRoleSelector();

const JoinSessionFormWrapper: React.FC = () => {
  const sessionId = useSelector(getSessionCurrentId);
  const sessionIdFromLocationState = useSessionId();
  const name = useSelector(getSessionUserName);
  const role = useSelector(initialUserRoleSelector);
  const isObserver = useSelector(getSessionUserIsObserver);
  const { joinSession } = useMappedDispatch(actions);

  const handleSubmit = (
    values: SessionFormData,
    { setSubmitting, setFieldValue, setFieldError }
  ) => {
    joinSession(
      joinSessionValidationSchema.cast(values),
      { setSubmitting, setFieldValue, setFieldError }
    );
  };

  const initialValues: SessionFormData = {
    sessionId: sessionId || sessionIdFromLocationState,
    role,
    isObserver,
    name,
    useRoles: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={false}
      onSubmit={handleSubmit}
      validationSchema={joinSessionValidationSchema}
      id="join-session-form"
    >
      {(formikProps: FormProps<SessionFormData>) => <JoinSessionFormFields {...formikProps} /> }
    </Formik>
  );
};

export default JoinSessionFormWrapper;
