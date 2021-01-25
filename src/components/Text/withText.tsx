import { connect } from 'react-redux';
import React, { ComponentType } from 'react';
import { GetText, getText, mapLocaleToProps } from './utils';

export interface WithText {
  getText: GetText;
}

function withText<T extends WithText>(Component: ComponentType<T>): ComponentType<any> {
  return connect(mapLocaleToProps)(({ locale, ...other }: any) => {
    const textGetter: GetText = (id, args = null) => getText(id, args, locale);

    return <Component {...other} getText={textGetter} />;
  });
}

export default withText;
