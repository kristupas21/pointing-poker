import React from 'react';
import { Form, Formik } from 'formik';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/global';
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

const mapStateToProps = (state: State) => ({
  roles: state.session.roles,
});

const mapDispatchToProps = {
  removeRole: removeSessionRole,
  saveRole: saveSessionRole,
  addRole: addSessionRole,
};

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const RolesForm: React.FC<Props> = (props) => {
  const { roles, removeRole, saveRole, addRole } = props;
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

          handleBlur(e);

          if (value) {
            saveRole({ id, name: values[name] });
          } else {
            resetForm();
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

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(RolesForm);
