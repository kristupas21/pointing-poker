import React, { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router';
import MainLayout from './MainLayout';
import { getRouteName } from '../../utils/routes';

function withMainLayout <T extends RouteComponentProps>(
  Component: ComponentType<T>,
): React.FC<T> {
  return (props) => {
    const { location } = props;

    return (
      <MainLayout route={getRouteName(location?.pathname)}>
        <Component {...props as T} />
      </MainLayout>
    );
  };
}

export default withMainLayout;
