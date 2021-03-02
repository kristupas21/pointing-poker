import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../../constants/routes';
import { useText } from '../../utils/customHooks';

const Navigation: React.FC = () => {
  const text = useText();

  return (
    <ul>
      <li>
        <NavLink to={ROUTE.BASE}>
          {text('nav.home')}
        </NavLink>
      </li>
      <li>
        <NavLink to={ROUTE.START_SESSION}>
          {text('nav.startSession')}
        </NavLink>
      </li>
      <li>
        <NavLink to={ROUTE.JOIN_SESSION}>
          {text('nav.joinSession')}
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
