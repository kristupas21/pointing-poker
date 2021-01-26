import React, { ComponentType } from 'react';

export interface DynamicWrapperItem<T = Record<string, any>> {
  show: boolean;
  Component: ComponentType<T>;
  componentProps?: T,
  isDefault?: boolean;
}

interface Props {
  items: DynamicWrapperItem[];
}

const DynamicWrapper: React.FC<Props> = (props) => {
  const { items, children } = props;
  const wrapperByDefault = items.find((i) => i.isDefault);
  const wrapperByCondition = items.find((i) => i.show);
  const wrapper = wrapperByCondition || wrapperByDefault;

  if (wrapper) {
    const { Component, componentProps } = wrapper;

    return (
      <Component {...componentProps}>
        {children}
      </Component>
    );
  }

  return <>{children}</>;
};

export default DynamicWrapper;
