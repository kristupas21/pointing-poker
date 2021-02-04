import React from 'react';
import { History } from 'history';
import Button from '../../components/Button';
import { IconId } from '../../utils/iconMap';
import { ROUTE } from '../../constants/routes';

export interface MainLayoutProps {
  history: History;
  withSettings?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const { withSettings = true, children, history } = props;
  const onHomeClick = () => history.push(ROUTE.BASE);

  return (
    <div style={{ border: '3px solid royalblue', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button icon={IconId.Home} onClick={onHomeClick} />
        {withSettings ? <Button icon={IconId.Settings} /> : <span />}
      </div>
      {children}
    </div>
  );
};

export default MainLayout;
