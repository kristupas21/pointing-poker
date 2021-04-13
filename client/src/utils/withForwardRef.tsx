import React, { ComponentType, Ref } from 'react';

function withForwardRef<P>(Component: ComponentType<P>) {
  return React.forwardRef(
    (props: P, ref: Ref<any>) => (
      <Component {...props} innerRef={ref} />
    )
  );
}

export default withForwardRef;
