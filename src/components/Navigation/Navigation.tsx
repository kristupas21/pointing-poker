import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../../constants/routes';
import Text from '../Text';

const Navigation: React.FC = () => (
  <ul>
    <li>
      <NavLink to={ROUTE.BASE}>
        <Text id="nav.home" />
      </NavLink>
    </li>
    <li>
      <NavLink to={ROUTE.START_SESSION}>
        <Text id="nav.startSession" />
      </NavLink>
    </li>
    <li>
      <NavLink to={ROUTE.JOIN_SESSION}>
        <Text id="nav.joinSession" />
      </NavLink>
    </li>
  </ul>
);

export default Navigation;
