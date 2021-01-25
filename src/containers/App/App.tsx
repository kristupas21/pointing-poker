import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import classNames from 'classnames/bind';
import { ROUTE } from '../../constants/routes';
import styles from './App.module.scss';
import Modal from '../../components/Modal';

const cx = classNames.bind(styles);

const LandingPage = lazy(() => import('../LandingPage'));
const StartSessionPage = lazy(() => import('../StartSessionPage'));
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
          path={ROUTE.BASE}
          component={LandingPage}
        />
        <Route
          exact
          path={ROUTE.START_SESSION}
          component={StartSessionPage}
        />
        <Route
          exact
          path={ROUTE.JOIN_SESSION}
          component={JoinSessionPage}
        />
        <Route
          exact
          path={ROUTE.SESSION}
          component={SessionPage}
        />
        <Route
          exact
          path={ROUTE.SESSION_NOT_FOUND}
          component={SessionNotFoundPage}
        />
        <Route
          exact
          path={ROUTE.ERROR}
          component={ErrorPage}
        />
        <Redirect to={ROUTE.BASE} />
      </Switch>
    </Suspense>
    <Modal />
  </div>
);

export default App;
