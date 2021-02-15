import React from 'react';
import { RouteChildrenProps } from 'react-router';
import CreateSessionForm from '../CreateSessionForm';

type Props = RouteChildrenProps;

const StartSessionPage: React.FC<Props> = () => (
  <CreateSessionForm type="start" />
);

export default StartSessionPage;
