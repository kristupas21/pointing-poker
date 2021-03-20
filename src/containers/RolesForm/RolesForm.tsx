import React, { FocusEvent } from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import {
  addSessionRole,
  removeSessionRole,
  saveSessionRole
} from 'state/session/sessionActions';
import Button from 'components/Button';
import { IconId } from 'components/Icon';
import DynamicFormField from 'components/Form/DynamicFormField';
import { getSessionRoles } from 'state/session/sessionStateGetters';
import { useMappedDispatch } from 'utils/customHooks';
import { AnimatePresence } from 'framer-motion';
import { mapRolesToFormData, withURF } from './utils';
import { MAX_ROLES_COUNT, MIN_ROLES_COUNT } from './constants';

const actions = {
  removeRole: removeSessionRole,
  saveRole: saveSessionRole,
  addRole: addSessionRole,
};

const RolesForm: React.FC = () => {
  const roles = useSelector(getSessionRoles);
  const { removeRole, saveRole, addRole } = useMappedDispatch(actions);
  const initialValues = mapRolesToFormData(roles);
  const isRemoveDisabled = roles.length <= MIN_ROLES_COUNT;
  const isAddDisabled = roles.length >= MAX_ROLES_COUNT;

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={undefined}
      >
        {({ handleBlur, values, resetForm }) => {
          const submitValues = (e: FocusEvent<HTMLInputElement>, id: string, name: string) => {
            const value = values[name];
            const duplicateOrEmpty = !value || roles.some((r) => r.id !== id && r.name === value);

            handleBlur(e);

            if (duplicateOrEmpty) {
              resetForm();
            } else {
              saveRole({ id, name: value });
            }
          };

          return (
            <Form name={withURF('form')}>
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
                      renderTextWhenInactive
                    />
                  );
                })}
              </AnimatePresence>
            </Form>
          );
        }}
      </Formik>
      <Button icon={IconId.Add} onClick={addRole} disabled={isAddDisabled} />
    </>
  );
};

export default RolesForm;
