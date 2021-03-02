import { useDispatch } from 'react-redux';

const useMappedDispatch = <T>(map: T): T => {
  const dispatch = useDispatch();

  return Object.entries(map).reduce((acc, [key, acs]) => {
    const actions = Array.isArray(acs) ? acs : [acs];

    return {
      ...acc,
      [key]: (...args) => actions.forEach((a) => dispatch(a(...args))),
    };
  }, {}) as T;
};

export default useMappedDispatch;
