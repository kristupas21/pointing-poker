import * as React from 'react';
import { FormikProps, connect } from 'formik';
import _debounce from 'lodash/debounce';
import isEqual from 'react-fast-compare';

export interface PersistProps {
  name: string;
  isSessionStorage?: boolean;
}

class PersistImpl extends React.Component<
    PersistProps & { formik: FormikProps<any> },
    {}
    > {
  private saveForm = _debounce((data: FormikProps<{}>) => {
    const { isSessionStorage, name } = this.props;

    if (isSessionStorage) {
      window.sessionStorage.setItem(name, JSON.stringify(data));
    } else {
      window.localStorage.setItem(name, JSON.stringify(data));
    }
  }, 300);

  public componentDidMount() {
    const { isSessionStorage, name, formik } = this.props;

    const maybeState = isSessionStorage
      ? window.sessionStorage.getItem(name)
      : window.localStorage.getItem(name);

    if (maybeState) {
      formik.setFormikState(JSON.parse(maybeState));
    }
  }

  public componentDidUpdate(prevProps: PersistProps & { formik: FormikProps<any> }) {
    const { formik } = this.props;

    if (!isEqual(prevProps.formik, formik)) {
      this.saveForm(formik);
    }
  }

  render() {
    return null;
  }
}

export default connect<PersistProps, any>(PersistImpl);
