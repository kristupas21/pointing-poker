import React, { ComponentType } from 'react';
import ReactFocusLock from 'react-focus-lock';

function withFocusLock<T>(Component: ComponentType<T>): ComponentType<T> {
  return (props) => (
    <ReactFocusLock>
      <Component {...props} />
    </ReactFocusLock>
  );
}

export default withFocusLock;
