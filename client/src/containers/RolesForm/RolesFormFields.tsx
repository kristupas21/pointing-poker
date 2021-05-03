import React, { ChangeEvent, FocusEvent } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { Form } from 'formik';
import { FormProps } from 'utils/form/types';
import { valueUnlocksHiddenFeats } from 'utils/hiddenFeats';
import { getSessionRoles } from 'state/session/sessionStateGetters';
import { getAppHiddenFeatsUnlocked } from 'state/app/appStateGetters';
import { unlockAppHiddenFeats } from 'state/app/appActions';
import { useMappedDispatch } from 'utils/customHooks';
import { removeSessionRole, saveSessionRoles } from 'state/session/sessionActions';
import DynamicFormField from 'components/Form/DynamicFormField';
import { withURF } from './utils';
import { MAX_ROLE_CHARS_COUNT, MIN_ROLES_COUNT } from './constants';

const actions = {
  removeRole: removeSessionRole,
  saveRoles: saveSessionRoles,
  unlockHiddenFeats: unlockAppHiddenFeats,
};

type Props = FormProps<Record<string, string>> & {
  isReadonly: boolean;
};

const RolesFormFields: React.FC<Props> = (props) => {
  const {
    errors,
    handleBlur,
    handleChange,
    isReadonly,
    resetForm,
    setFieldValue,
    values,
  } = props;

  const roles = useSelector(getSessionRoles);
  const hiddenFeatsUnlocked = useSelector(getAppHiddenFeatsUnlocked);
  const { unlockHiddenFeats, saveRoles, removeRole } = useMappedDispatch(actions);
  const isRemoveDisabled = roles.length <= MIN_ROLES_COUNT;

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const { value } = e.target;

    if (value.length > MAX_ROLE_CHARS_COUNT) {
      return setFieldValue(id, value.slice(0, MAX_ROLE_CHARS_COUNT));
    }

    return handleChange(e);
  };

  const submitValues = (e: FocusEvent<HTMLInputElement>, id: string) => {
    const value = values[id];
    const duplicateOrEmpty = !value || roles.some((r) => r === value);

    handleBlur(e);

    if (!isEmpty(errors)) {
      return resetForm();
    }

    if (!hiddenFeatsUnlocked && valueUnlocksHiddenFeats(value)) {
      unlockHiddenFeats();
      return resetForm();
    }

    if (duplicateOrEmpty) {
      return resetForm();
    }

    return saveRoles(Object.values(values));
  };

  return (
    <Form name={withURF('form')} noValidate>
      {roles.map((role) => {
        const name = withURF(role);
        const handleRemoveClick = () => removeRole(role);

        return (
          <DynamicFormField
            key={name}
            id={name}
            isRemoveDisabled={isRemoveDisabled}
            onRemoveClick={handleRemoveClick}
            onBlur={submitValues}
            name={name}
            currentValue={values[name]}
            isReadonly={isReadonly}
            onChange={handleFieldChange}
          />
        );
      })}
    </Form>
  );
};

export default RolesFormFields;
