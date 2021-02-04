import React, { ComponentType } from 'react';
import MainLayout, { MainLayoutProps } from './MainLayout';

function withMainLayout <T>(Component: ComponentType<T>): React.FC<T & MainLayoutProps> {
  return ({ withSettings, ...other }) => (
    <MainLayout withSettings={withSettings} history={other.history}>
      <Component {...other as T} />
    </MainLayout>
  );
}

export default withMainLayout;
