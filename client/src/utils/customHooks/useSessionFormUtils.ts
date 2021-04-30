import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { CustomFormError, CustomFormErrors } from 'utils/form/types';
import { getNormalizedSessionRoles } from 'state/session/sessionStateGetters';
import { getFormIsLoading } from 'state/form/formStateGetters';
import { resetSessionState as resetSessionStateAction } from 'state/session/sessionActions';
import useText from './useText';
import useMappedDispatch from './useMappedDispatch';

const actions = {
  resetSessionState: resetSessionStateAction,
};

type HookReturnValue = {
  getErrorText: (e: CustomFormError) => string;
  submitDisabled: boolean;
}

export default (
  errors: CustomFormErrors,
  role: string,
  setFieldValue: (key: string, value: any) => void,
  isSubmitting: boolean,
): HookReturnValue => {
  const roles = useSelector(getNormalizedSessionRoles);
  const isLoading = useSelector(getFormIsLoading);
  const { resetSessionState } = useMappedDispatch(actions);
  const text = useText();
  const getErrorText = (e: CustomFormError) => e?.id && text(e.id, e.values);
  const submitDisabled = isLoading || isSubmitting || !isEmpty(errors);

  useEffect(() => {
    if (role && !roles.includes(role)) {
      setFieldValue('role', '');
    }
  }, [roles]);

  useEffect(() => {
    resetSessionState();

    return () => resetSessionState();
  }, []);

  return {
    getErrorText,
    submitDisabled,
  };
};
