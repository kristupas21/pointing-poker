import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import classNames from 'classnames/bind';
import { AnimatePresence } from 'framer-motion';
import { AppRoute } from 'utils/routes';
import { withMainLayout } from 'containers/MainLayout';
import LandingPageComponent from 'containers/LandingPage';
import StartSessionPageComponent from 'containers/StartSessionPage';
import JoinSessionPageComponent from 'containers/JoinSessionPage';
import SessionPageComponent from 'containers/SessionPage';
import SessionNotFoundPageComponent from 'containers/SessionNotFoundPage';
import ErrorPageComponent from 'containers/ErrorPage';
import Notifications from 'containers/Notifications';
import styles from './App.module.scss';

const cx = classNames.bind(styles);

const LandingPage = withMainLayout(LandingPageComponent);

const SessionNotFoundPage = withMainLayout(SessionNotFoundPageComponent);

const ErrorPage = withMainLayout(ErrorPageComponent);

const StartSessionPage = withMainLayout(StartSessionPageComponent);

const JoinSessionPage = withMainLayout(JoinSessionPageComponent);

const SessionPage = withMainLayout(SessionPageComponent);

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className={cx('app')}>
      <AnimatePresence initial={false} exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route
            exact
            path={AppRoute.Base}
            component={LandingPage}
          />
          <Route
            exact
            path={AppRoute.StartSession}
            component={StartSessionPage}
          />
          <Route
            exact
            path={AppRoute.JoinSession}
            component={JoinSessionPage}
          />
          <Route
            exact
            path={AppRoute.Session}
            component={SessionPage}
          />
          <Route
            exact
            path={AppRoute.SessionNotFound}
            component={SessionNotFoundPage}
          />
          <Route
            exact
            path={AppRoute.Error}
            component={ErrorPage}
          />
          <Redirect to={AppRoute.Base} />
        </Switch>
      </AnimatePresence>
      <Notifications />
    </div>
  );
};

export default App;
