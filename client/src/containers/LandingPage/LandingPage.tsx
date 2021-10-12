import React, { useContext } from 'react';
import { RouteChildrenProps } from 'react-router';
import Button, { ButtonVariant } from 'components/Button';
import { useText } from 'utils/customHooks';
import { AppRoute } from 'utils/routes';
import { isTouchDevice } from 'utils/navigator';
import BreakpointsContext from 'context/Breakpoints';
import classNames from 'classnames/bind';
import styles from './LandingPage.module.scss';

const cx = classNames.bind(styles);

type Props = RouteChildrenProps;

const LandingPage: React.FC<Props> = (props) => {
  const { history } = props;
  const { isMobile, isTablet, isDesktop } = useContext(BreakpointsContext);
  const text = useText();

  const handleStartClick = () =>
    history.push(AppRoute.StartSession);

  const handleJoinClick = () =>
    history.push(AppRoute.JoinSession);

  return (
    <div className={cx('landing')}>
      {/* <p>
        {isMobile && 'MOBILE'}
        {isTablet && 'TABLET'}
        {isDesktop && 'DESKTOP'}
        <br />
        {`TOUCH: ${isTouchDevice()}`}
      </p> */}
      <Button className={cx('landing__button')} variant={ButtonVariant.Primary} colored onClick={handleStartClick} role="link">
        {text('session.start')}
      </Button>
      {text('global.or')}
      <Button className={cx('landing__button')} variant={ButtonVariant.Primary} onClick={handleJoinClick} role="link">
        {text('session.join')}
      </Button>
    </div>
  );
};

export default LandingPage;
