import React, { FocusEvent, useState } from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import {
  addSessionRole,
  removeSessionRole,
  saveSessionRole,
  resetSessionRoles,
} from 'state/session/sessionActions';
import Button from 'components/Button';
import { IconId } from 'components/Icon';
import DynamicFormField from 'components/Form/DynamicFormField';
import { getSessionRoles } from 'state/session/sessionStateGetters';
import { useMappedDispatch, useText } from 'utils/customHooks';
import { AnimatePresence } from 'framer-motion';
import { findRoleMatchOnlyByName } from 'utils/userRoles/utils';
import { mapRolesToFormData, withURF } from './utils';
import { MAX_ROLES_COUNT, MIN_ROLES_COUNT } from './constants';

const actions = {
  removeRole: removeSessionRole,
  saveRole: saveSessionRole,
  addRole: addSessionRole,
  resetRoles: resetSessionRoles,
};

const RolesForm: React.FC = () => {
  const roles = useSelector(getSessionRoles);
  const { removeRole, saveRole, addRole, resetRoles } = useMappedDispatch(actions);
  const [isEditOn, setEditOn] = useState(false);
  const text = useText();
  const initialValues = mapRolesToFormData(roles);
  const isRemoveDisabled = roles.length <= MIN_ROLES_COUNT;
  const isAddDisabled = roles.length >= MAX_ROLES_COUNT;

  return (
    <>
      <h4>{text('session.roles')}</h4>
      <Button onClick={() => setEditOn(!isEditOn)}>EDIT</Button>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={undefined}
      >
        {({ handleBlur, values, resetForm }) => {
          const submitValues = (e: FocusEvent<HTMLInputElement>, id: string, name: string) => {
            const value = values[name];
            const duplicateOrEmpty = !value || findRoleMatchOnlyByName(roles, { id, name });

            handleBlur(e);

            if (duplicateOrEmpty) {
              resetForm();
            } else {
              saveRole({ id, name: value });
            }
          };

          return (
            <Form name={withURF('form')} noValidate>
              <AnimatePresence>
                {roles.map((role) => {
                  const name = withURF(role.id);

                  return (
                    <DynamicFormField
                      key={role.id}
                      id={role.id}
                      isRemoveDisabled={isRemoveDisabled}
                      onRemoveClick={removeRole}
                      onBlur={submitValues}
                      name={name}
                      currentValue={values[name]}
                      isReadonly={!isEditOn}
                    />
                  );
                })}
              </AnimatePresence>
            </Form>
          );
        }}
      </Formik>
      <Button icon={IconId.Add} onClick={addRole} disabled={isAddDisabled} />
      <Button onClick={resetRoles}>
        {text('global.reset')}
      </Button>
    </>
  );
};

export default RolesForm;
