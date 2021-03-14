import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import classNames from 'classnames/bind';
import { AnimatePresence } from 'framer-motion';
import { ROUTE } from 'constants/routes';
import Modal from 'components/Modal';
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
const SessionPage = withMainLayout(SessionPageComponent, true);

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className={cx('app')}>
      <AnimatePresence initial={false} exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
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
      </AnimatePresence>
      <Modal />
      <Notifications />
    </div>
  );
};

export default App;
