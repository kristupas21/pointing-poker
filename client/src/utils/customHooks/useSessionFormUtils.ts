import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { CustomFormError, CustomFormErrors } from 'utils/form/types';
import { getNormalizedSessionRoles } from 'state/session/sessionStateGetters';
import { getFormIsLoading } from 'state/form/formStateGetters';
import useText from './useText';

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
  const text = useText();
  const getErrorText = (e: CustomFormError) => e?.id && text(e.id, e.values);
  const submitDisabled = isLoading || isSubmitting || !isEmpty(errors);

  useEffect(() => {
    if (role && !roles.some((r) => r === role)) {
      setFieldValue('role', '');
    }
  }, [roles]);

  return {
    getErrorText,
    submitDisabled,
  };
};
