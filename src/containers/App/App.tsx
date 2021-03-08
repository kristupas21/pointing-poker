import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import classNames from 'classnames/bind';
import { AnimatePresence } from 'framer-motion';
import { ROUTE } from '../../constants/routes';
import styles from './App.module.scss';
import Modal from '../../components/Modal';
import { withMainLayout } from '../MainLayout';
import LandingPageComponent from '../LandingPage';
import StartSessionPageComponent from '../StartSessionPage';
import JoinSessionPageComponent from '../JoinSessionPage';
import SessionPageComponent from '../SessionPage';
import SessionNotFoundPageComponent from '../SessionNotFoundPage';
import ErrorPageComponent from '../ErrorPage';
import Navigation from '../../components/Navigation';
import Sidebar from '../../components/Sidebar';
import Notifications from '../Notifications';

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
      <Sidebar>
        <Navigation />
      </Sidebar>
      <Modal />
      <Notifications />
    </div>
  );
};

export default App;
