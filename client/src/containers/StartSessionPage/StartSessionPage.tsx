import React from 'react';
import { RouteChildrenProps } from 'react-router';
import PointValuesForm from 'containers/PointValuesForm';
import RolesForm from 'containers/RolesForm';
import classNames from 'classnames/bind';
import StartSessionForm from '../SessionForms/StartSessionForm';
import styles from './StartSessionPage.module.scss';

const cx = classNames.bind(styles);

type Props = RouteChildrenProps

const StartSessionPage: React.FC<Props> = () => (
  <div className={cx('start-session')}>
    <StartSessionForm />
    <div className={cx('start-session__divider')} />
    <PointValuesForm />
    <div className={cx('start-session__divider')} />
    <RolesForm />
  </div>
);

export default StartSessionPage;
