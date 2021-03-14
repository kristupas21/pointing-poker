import React, { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router';
import MainLayout from './MainLayout';

function withMainLayout <T extends RouteComponentProps>(Component: ComponentType<T>, withSettings = false): React.FC<T> {
  return (props) => {
    const { location } = props;

    return (
      <MainLayout route={location?.pathname} withSettings={withSettings}>
        <Component {...props as T} />
      </MainLayout>
    );
  };
}

export default withMainLayout;
