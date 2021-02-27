import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import classNames from 'classnames/bind';
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

const cx = classNames.bind(styles);

const LandingPage = withMainLayout(LandingPageComponent);
const SessionNotFoundPage = withMainLayout(SessionNotFoundPageComponent);
const ErrorPage = withMainLayout(ErrorPageComponent);
const StartSessionPage = withMainLayout(StartSessionPageComponent);
const JoinSessionPage = withMainLayout(JoinSessionPageComponent);
const SessionPage = withMainLayout(SessionPageComponent);

const App: React.FC = () => (
  <div className={cx('app')}>
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
    <Modal />
  </div>
);

export default App;
