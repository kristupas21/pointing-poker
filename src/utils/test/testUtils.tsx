import React, { ComponentType, PropsWithChildren } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { throwError } from 'redux-saga-test-plan/providers';

export function shallowWrapperCreator<P, S = any>(
  Component: ComponentType<P>,
  defaultProps?: PropsWithChildren<P>
): (props?: Partial<PropsWithChildren<P>>) => ShallowWrapper<P, S, any> {
  return (props = {}) => shallow(<Component {...defaultProps} {...props} />);
}

export const mockLocationChange = (pathname: string): LocationChangeAction => ({
  type: LOCATION_CHANGE,
  payload: {
    isFirstRendering: false,
    action: 'PUSH',
    location: {
      pathname,
      search: null,
      state: null,
      hash: null,
    },
  }
});

export const throwApiError = throwError as (error?: any) => any;
