import { connect } from 'react-redux';
import React, { ComponentType } from 'react';
import { StateMapper } from '../../types/global';
import { GetText, getText } from './utils';

export interface WithText {
  getText: GetText;
}

const mapStateToProps: StateMapper = (state) => ({
  locale: state.app.locale,
});

function withText<T extends WithText>(Component: ComponentType<T>): ComponentType<any> {
  return connect(mapStateToProps)(({ locale, ...other }: any) => {
    const textGetter: GetText = (id, args = null) => getText(id, args, locale);

    return <Component {...other} getText={textGetter} />;
  });
}

export default withText;
