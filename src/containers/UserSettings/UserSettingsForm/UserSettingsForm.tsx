import React from 'react';
import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux';
import { useText } from 'utils/customHooks';
import { getSessionRoles } from 'state/session/sessionStateGetters';
import { FieldType, FormField } from 'components/Form';
import { FieldSize } from 'components/Form/types';
import { UserSettingsFormData } from './types';
import { User } from '../../../types/global';

type Props = {
  initialValues: UserSettingsFormData;
  isObserver: boolean;
  useRoles: boolean;
  submitField: (params: Partial<User>) => void;
}

const UserSettingsForm: React.FC<Props> = (props) => {
  const { initialValues, isObserver, useRoles, submitField } = props;
  const roles = useSelector(getSessionRoles);
  const text = useText();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={undefined}
      enableReinitialize
      id="user-settings-form"
    >
      {({ handleBlur, values, setFieldValue, resetForm }) => {
        const submitName = (e) => {
          handleBlur(e);

          if (values.name) {
            submitField({ name: values.name });
          } else {
            resetForm();
          }
        };

        const submitRole = (fieldName: string, value: string) => {
          setFieldValue(fieldName, value);
          submitField({ role: value });
        };

        return (
          <Form>
            <FormField
              name="name"
              type={FieldType.Input}
              label={text('session.field.name.label')}
              size={FieldSize.Large}
              placeholder={text('session.field.name.placeholder')}
              onBlur={submitName}
              isBlock
            />
            {useRoles && (
              <FormField
                name="role"
                type={FieldType.Select}
                label={text('session.field.role.label')}
                placeholder={text('session.field.role.placeholder')}
                options={roles}
                disabled={isObserver}
                isBlock
                value={values.role}
                size={FieldSize.Large}
                setFieldValue={submitRole}
              />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserSettingsForm;
