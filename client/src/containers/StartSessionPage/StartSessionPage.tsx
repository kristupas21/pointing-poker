import React from 'react';
import { RouteChildrenProps } from 'react-router';
import PointValuesForm from 'containers/PointValuesForm';
import RolesForm from 'containers/RolesForm';
import StartSessionForm from '../SessionForms/StartSessionForm';

type Props = RouteChildrenProps

const StartSessionPage: React.FC<Props> = () => (
  <div>
    <StartSessionForm />
    <PointValuesForm />
    <RolesForm />
  </div>
);

export default StartSessionPage;
