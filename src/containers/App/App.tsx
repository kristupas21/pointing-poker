import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import classNames from 'classnames/bind';
import ROUTES from '../../constants/routes';
import styles from './App.module.scss';

const cx = classNames.bind(styles);

const LandingPage = lazy(() => import('../LandingPage'));
const CreateSessionPage = lazy(() => import('../CreateSessionPage'));
const JoinSessionPage = lazy(() => import('../JoinSessionPage'));
const SessionPage = lazy(() => import('../SessionPage'));
const SessionNotFoundPage = lazy(() => import('../SessionNotFoundPage'));
const ErrorPage = lazy(() => import('../ErrorPage'));

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
          component={LandingPage}
        />
        <Route
          exact
          path={ROUTES.CREATE_SESSION}
          component={CreateSessionPage}
        />
        <Route
          exact
          path={ROUTES.JOIN_SESSION}
          component={JoinSessionPage}
        />
        <Route
          exact
          path={ROUTES.SESSION}
          component={SessionPage}
        />
        <Route
          exact
          path={ROUTES.SESSION_NOT_FOUND}
          component={SessionNotFoundPage}
        />
        <Route
          exact
          path={ROUTES.ERROR}
          component={ErrorPage}
        />
        <Redirect to={ROUTES.BASE} />
      </Switch>
    </Suspense>
  </div>
);

export default App;
