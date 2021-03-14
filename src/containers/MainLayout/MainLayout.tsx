import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import Button from 'components/Button';
import { ROUTE } from 'constants/routes';
import animations from 'utils/animations';
import Logo from 'components/Logo';
import { useHistory } from 'react-router';
import styles from './MainLayout.module.scss';
import { setAppSidebarOpen } from '../../state/app/appActions';
import { useMappedDispatch } from '../../utils/customHooks';
import Sidebar from '../../components/Sidebar';
import UserSettings from '../UserSettings';
import { ClearStorageButton } from '../../_develop/_developComponents';

const cx = classNames.bind(styles);

const actions = {
  setSidebarOpen: setAppSidebarOpen,
};

type Props = {
  children?: ReactNode;
  route: string;
  withSettings?: boolean;
};

const MainLayout: React.FC<Props> = (props) => {
  const { children, route, withSettings = false } = props;
  const { setSidebarOpen } = useMappedDispatch(actions);
  const history = useHistory();
  const handleLogoClick = () => history.push(ROUTE.BASE);

  return (
    <div className={cx('layout')}>
      <div className={cx('layout__content')}>
        <div className={cx('layout__controls')}>
          <Button onClick={handleLogoClick}>
            <Logo />
          </Button>
          {withSettings && <Button onClick={() => setSidebarOpen(true)}>Settings</Button>}
        </div>
        <motion.div
          className={cx('layout__children')}
          key={route}
          {...animations.simpleOpacity}
        >
          {children}
        </motion.div>
      </div>
      {withSettings && (
        <Sidebar>
          <UserSettings />
          <ClearStorageButton />
        </Sidebar>
      )}
    </div>
  );
};

export default MainLayout;
