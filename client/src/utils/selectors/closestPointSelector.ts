import { createSelector } from 'reselect';
import { getSessionPointValues } from '../../state/session/sessionStateGetters';
import { calcClosestPoint } from '../mathOps';
import { makeResultSelector } from './index';
import { State } from '../../globalTypes';
import { PointValue } from '../pointValues/types';

const resultSelector = makeResultSelector();

export default () => createSelector<State, string, PointValue[], string>(
  resultSelector,
  getSessionPointValues,
  calcClosestPoint,
);
