import React, { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router';
import MainLayout from './MainLayout';

function withMainLayout <T extends RouteComponentProps>(
  Component: ComponentType<T>,
  renderMenu: boolean = false,
): React.FC<T> {
  return (props) =>
    (
      <MainLayout renderMenu={renderMenu} {...props}>
        <Component {...props as T} />
      </MainLayout>
    );
}

export default withMainLayout;
