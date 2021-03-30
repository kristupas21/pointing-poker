import React, { FocusEvent, useState } from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import {
  addSessionRole,
  removeSessionRole,
  saveSessionRoles,
  resetSessionRoles,
} from 'state/session/sessionActions';
import Button from 'components/Button';
import { IconId } from 'components/Icon';
import DynamicFormField from 'components/Form/DynamicFormField';
import { getSessionRoles } from 'state/session/sessionStateGetters';
import { useMappedDispatch, useText } from 'utils/customHooks';
import { mapRolesToFormData, withURF } from './utils';
import { MAX_ROLES_COUNT, MIN_ROLES_COUNT } from './constants';

const actions = {
  removeRole: removeSessionRole,
  saveRoles: saveSessionRoles,
  addRole: addSessionRole,
  resetRoles: resetSessionRoles,
};

const RolesForm: React.FC = () => {
  const roles = useSelector(getSessionRoles);
  const { removeRole, saveRoles, addRole, resetRoles } = useMappedDispatch(actions);
  const [isEditOn, setEditOn] = useState(false);
  const initialValues = mapRolesToFormData(roles);
  const text = useText();
  const isRemoveDisabled = roles.length <= MIN_ROLES_COUNT;
  const isAddDisabled = !isEditOn || roles.length >= MAX_ROLES_COUNT;

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
          const submitValues = (e: FocusEvent<HTMLInputElement>, id: string) => {
            const value = values[id];
            const duplicateOrEmpty = !value || roles.some((r) => r === value);

            handleBlur(e);

            if (duplicateOrEmpty) {
              resetForm();
            } else {
              saveRoles(Object.values(values));
            }
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
      <Button icon={IconId.Add} onClick={addRole} disabled={isAddDisabled} />
      <Button onClick={resetRoles}>
        {text('global.reset')}
      </Button>
    </>
  );
};

export default RolesForm;
