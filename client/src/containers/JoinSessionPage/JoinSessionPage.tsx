import React from 'react';
import { RouteChildrenProps } from 'react-router';
import JoinSessionForm from 'containers/SessionForms/JoinSessionForm';

type Props = RouteChildrenProps;

const JoinSessionPage: React.FC<Props> = () => (
  <JoinSessionForm />
);

export default JoinSessionPage;
