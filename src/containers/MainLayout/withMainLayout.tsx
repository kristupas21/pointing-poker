import React, { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router';
import MainLayout from './MainLayout';

function withMainLayout <T extends RouteComponentProps>(
  Component: ComponentType<T>,
  withUserSettings = false
): React.FC<T> {
  return (props) => {
    const { location } = props;

    return (
      <MainLayout route={location?.pathname} withUserSettings={withUserSettings}>
        <Component {...props as T} />
      </MainLayout>
    );
  };
}

export default withMainLayout;
