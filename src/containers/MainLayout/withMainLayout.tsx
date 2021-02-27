import React, { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router';
import MainLayout, { MainLayoutProps } from './MainLayout';

function withMainLayout <T extends RouteComponentProps>(Component: ComponentType<T>): React.FC<T & MainLayoutProps> {
  return (props) => {
    const { history, location } = props;

    return (
      <MainLayout
        history={history}
        pathname={location.pathname}
      >
        <Component {...props as T} />
      </MainLayout>
    );
  };
}

export default withMainLayout;
