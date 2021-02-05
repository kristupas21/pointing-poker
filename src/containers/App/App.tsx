import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import classNames from 'classnames/bind';
import { ROUTE } from '../../constants/routes';
import styles from './App.module.scss';
import Modal from '../../components/Modal';
import { withMainLayout } from '../MainLayout';

const cx = classNames.bind(styles);

const LandingPage = lazy(() => import('../LandingPage'));

const SessionNotFoundPage = withMainLayout(lazy(() => import('../SessionNotFoundPage')));
const ErrorPage = withMainLayout(lazy(() => import('../ErrorPage')));
const StartSessionPage = withMainLayout(lazy(() => import('../StartSessionPage')));
const JoinSessionPage = withMainLayout(lazy(() => import('../JoinSessionPage')));
const SessionPage = withMainLayout(lazy(() => import('../SessionPage')));

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
          render={(routeProps) =>
            <SessionNotFoundPage {...routeProps} withSettings={false} />}
        />
        <Route
          exact
          path={ROUTE.ERROR}
          render={(routeProps) =>
            <ErrorPage {...routeProps} withSettings={false} />}
        />
        <Redirect to={ROUTE.BASE} />
      </Switch>
    </Suspense>
    <Modal />
  </div>
);

export default App;
