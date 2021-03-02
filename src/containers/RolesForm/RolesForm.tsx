import React from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { mapRolesToFormData, withURF } from './utils';
import {
  addSessionRole,
  removeSessionRole,
  saveSessionRole
} from '../../state/session/sessionActions';
import Button from '../../components/Button';
import { IconId } from '../../components/Icon';
import { MAX_ROLES_COUNT, MIN_ROLES_COUNT } from './constants';
import DynamicFormField from '../../components/Form/DynamicFormField';
import { getSessionRoles } from '../../state/session/sessionStateGetters';
import { useMappedDispatch } from '../../utils/customHooks';

const mapDispatchToProps = {
  removeRole: removeSessionRole,
  saveRole: saveSessionRole,
  addRole: addSessionRole,
};

const RolesForm: React.FC = () => {
  const roles = useSelector(getSessionRoles);
  const { removeRole, saveRole, addRole } = useMappedDispatch(mapDispatchToProps);
  const initialValues = mapRolesToFormData(roles);
  const isRemoveDisabled = roles.length <= MIN_ROLES_COUNT;
  const isAddDisabled = roles.length >= MAX_ROLES_COUNT;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={undefined}
    >
      {({ handleBlur, values, resetForm }) => {
        const submitValues = (e, id: string, name: string) => {
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
          <Form name="urf">
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
                />
              );
            })}
            <Button icon={IconId.Add} onClick={addRole} disabled={isAddDisabled} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default RolesForm;
