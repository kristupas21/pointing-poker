import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

const useMappedDispatch = <T>(map: T): T => {
  const dispatch = useDispatch();

  return useMemo(() =>
    Object.entries(map).reduce((acc, [key, acs]) => {
      const actions = Array.isArray(acs) ? acs : [acs];

      return {
        ...acc,
        [key]: (...args) => actions.forEach((a) => dispatch(a(...args))),
      };
    }, {}) as T, [dispatch]);
};

export default useMappedDispatch;
