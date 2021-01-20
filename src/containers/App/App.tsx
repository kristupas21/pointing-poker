import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import classNames from 'classnames/bind';
import ROUTES from '../../constants/routes';
import styles from './App.module.scss';
import ErrorPage from '../ErrorPage';

const cx = classNames.bind(styles);

const ChooseSession = lazy(() => import('../ChooseSession'));
const Session = lazy(() => import('../Session'));

interface Props {
  name?: string;
}

const App: React.FC<Props> = () => (
  <div className={cx('app')}>
    <Suspense fallback={null}>
      <Switch>
        <Route
          exact
          path={ROUTES.BASE}
          component={ChooseSession}
        />
        <Route
          exact
          path={ROUTES.SESSION}
          component={Session}
        />
        <Route
          component={ErrorPage}
        />
      </Switch>
    </Suspense>
  </div>
);

export default App;
