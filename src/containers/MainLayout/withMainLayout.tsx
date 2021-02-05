import React, { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router';
import MainLayout, { MainLayoutProps } from './MainLayout';

function withMainLayout <T extends RouteComponentProps>(Component: ComponentType<T>): React.FC<T & MainLayoutProps> {
  return ({ withSettings, ...other }) => (
    <MainLayout
      withSettings={withSettings}
      history={other.history}
      pathname={other.location.pathname}
    >
      <Component {...other as T} />
    </MainLayout>
  );
}

export default withMainLayout;
