import React from 'react';
import { RouteChildrenProps } from 'react-router';
import CreateSessionForm from '../CreateSessionForm';

type Props = RouteChildrenProps;

const JoinSessionPage: React.FC<Props> = () => (
  <CreateSessionForm type="join" />
);

export default JoinSessionPage;
