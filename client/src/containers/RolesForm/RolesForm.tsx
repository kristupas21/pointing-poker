import React, { FocusEvent, useState } from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import {
  addSessionRole,
  removeSessionRole,
  saveSessionRoles,
  resetSessionRoles, clearSessionPlaceholders,
} from 'state/session/sessionActions';
import Button, { ButtonVariant } from 'components/Button';
import { IconId } from 'components/Icon';
import DynamicFormField from 'components/Form/DynamicFormField';
import { getSessionRoles } from 'state/session/sessionStateGetters';
import { useMappedDispatch, useText } from 'utils/customHooks';
import { DEFAULT_USER_ROLES } from 'utils/userRoles';
import { unlockAppHiddenFeats } from 'state/app/appActions';
import { getAppHiddenFeatsUnlocked } from 'state/app/appStateGetters';
import { valueUnlocksHiddenFeats } from 'utils/hiddenFeats';
import { mapRolesToFormData, withURF } from './utils';
import { MAX_ROLES_COUNT, MIN_ROLES_COUNT } from './constants';

const actions = {
  removeRole: removeSessionRole,
  saveRoles: saveSessionRoles,
  addRole: addSessionRole,
  resetRoles: resetSessionRoles,
  unlockHiddenFeats: unlockAppHiddenFeats,
  clearPlaceholders: clearSessionPlaceholders,
};

const RolesForm: React.FC = () => {
  const roles = useSelector(getSessionRoles);
  const hiddenFeatsUnlocked = useSelector(getAppHiddenFeatsUnlocked);
  const {
    removeRole,
    saveRoles,
    addRole,
    resetRoles,
    unlockHiddenFeats,
    clearPlaceholders,
  } = useMappedDispatch(actions);
  const [isEditOn, setEditOn] = useState(false);
  const initialValues = mapRolesToFormData(roles);
  const text = useText();
  const isRemoveDisabled = roles.length <= MIN_ROLES_COUNT;
  const isAddDisabled = !isEditOn || roles.length >= MAX_ROLES_COUNT;

  const handleEditClick = () => {
    isEditOn && clearPlaceholders();
    setEditOn((wasEditOn) => !wasEditOn);
  };

  return (
    <>
      <h4>{text('session.roles')}</h4>
      <Button
        onClick={handleEditClick}
        icon={isEditOn ? IconId.Checkmark : IconId.Edit}
        variant={ButtonVariant.Primary}
        round
      />
      <Button
        onClick={resetRoles}
        disabled={isEqual(roles, DEFAULT_USER_ROLES)}
        icon={IconId.Reset}
        variant={ButtonVariant.Primary}
        round
      />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={undefined}
      >
        {({ handleBlur, values, resetForm }) => {
          const submitValues = (e: FocusEvent<HTMLInputElement>, id: string) => {
            const value = values[id];
            const duplicateOrEmpty = !value || roles.some((r) => r === value);

            handleBlur(e);

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
                    isReadonly={!isEditOn}
                  />
                );
              })}
            </Form>
          );
        }}
      </Formik>
      <Button
        variant={ButtonVariant.Primary}
        icon={IconId.Add}
        onClick={addRole}
        disabled={isAddDisabled}
        round
      />
    </>
  );
};

export default RolesForm;
