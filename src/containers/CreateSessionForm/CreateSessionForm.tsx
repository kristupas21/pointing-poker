import React from 'react';
import { Form, Formik } from 'formik';
import { connect, ConnectedProps } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import omit from 'lodash/omit';
import { FieldType, FormField, SubmitHandler } from '../../components/Form';
import { useSessionId } from '../../utils/customHooks';
import Button from '../../components/Button';
import { withText, WithText } from '../../components/Text';
import { MessageId } from '../../lang';
import USER_ROLES from '../../constants/userRoles';
import validationSchema from './validationSchema';
import { joinSession as joinSessionAction, startSession as startSessionAction } from '../../state/session/sessionActions';

const mapDispatchToProps = {
  joinSession: joinSessionAction,
  startSession: startSessionAction,
};

type ReduxProps = ConnectedProps<typeof connector>;

export interface CreateSessionFormData {
  sessionId?: string;
  name: string;
  role: string;
  isObserver: boolean;
}

type Props = WithText & RouteChildrenProps & ReduxProps & {
  type: 'join' | 'start';
};

const JoinSessionPage: React.FC<Props> = (props) => {
  const { getText, joinSession, type, startSession } = props;
  const isJoinType = type === 'join';
  const sessionId = useSessionId();

  const initialValues: CreateSessionFormData =
        { sessionId: sessionId || '', name: '', role: '', isObserver: false };

  const roles = USER_ROLES.map((role) =>
    ({ ...role, name: getText(role.name as MessageId) }));

  const handleSubmit: SubmitHandler<CreateSessionFormData> = (values, { setSubmitting }) => {
    if (isJoinType) {
      joinSession(values, setSubmitting);
    } else {
      startSession(omit(values, 'sessionId'), setSubmitting);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema(getText, isJoinType)}
    >
      {({ isSubmitting, errors, values }) => (
        <Form>
          {isJoinType && (
            <FormField
              name="sessionId"
              type={FieldType.Input}
              error={errors.sessionId}
              label={getText('session.id')}
            />
          )}
          <FormField
            name="name"
            type={FieldType.Input}
            error={errors.name}
            label={getText('session.field.name.label')}
          />
          <FormField
            name="role"
            type={FieldType.Select}
            label={getText('session.field.role.label')}
            emptyOptionText={getText('session.field.role.placeholder')}
            options={roles}
            disabled={values.isObserver}
          />
          <FormField
            name="isObserver"
            type={FieldType.Checkbox}
            label={getText('session.field.observer.label')}
          />
          <Button type="submit" disabled={isSubmitting}>
            {getText(isJoinType ? 'session.join' : 'session.start')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const connector = connect(null, mapDispatchToProps);

export default connector(withText(JoinSessionPage));
