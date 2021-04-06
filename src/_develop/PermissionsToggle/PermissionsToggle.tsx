import React from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { FieldType, FormField } from 'components/Form';
import { useMappedDispatch, useText } from 'utils/customHooks';
import { getSessionIsCreatedByMe, getSessionUsePermissions } from 'state/session/sessionStateGetters';
import { setSessionParams as setSessionParamsAction } from 'state/session/sessionActions';
import { wsUpdateSessionPermissions as wsUpdateSessionPermissionsAction } from 'state/ws/wsActions';

const actions = {
  setSessionParams: setSessionParamsAction,
  wsUpdateSessionPermissions: wsUpdateSessionPermissionsAction,
};

const PermissionsToggle: React.FC = () => {
  const text = useText();
  const usePermissions = useSelector(getSessionUsePermissions);
  const isCreatedByMe = useSelector(getSessionIsCreatedByMe);
  const { setSessionParams, wsUpdateSessionPermissions } = useMappedDispatch(actions);

  const handleChange = () => {
    const newValue = !usePermissions;

    setSessionParams({ usePermissions: newValue });
    wsUpdateSessionPermissions(newValue);
  };

  // This should be moved outside this component
  if (!isCreatedByMe) {
    return null;
  }

  return (
    <Formik initialValues={{ usePermissions }} onSubmit={undefined} enableReinitialize={false}>
      <FormField
        name="usePermissions"
        type={FieldType.Switch}
        label={text('session.field.usePermissions.label')}
        checked={usePermissions}
        onChange={handleChange}
        isBlock
      />
    </Formik>
  );
};

export default PermissionsToggle;
