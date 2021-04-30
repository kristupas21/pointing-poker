import { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router';

export default (): string => {
  const history = useHistory();
  const location = useLocation<{ sessionId: string }>();
  const { current: id } = useRef(location?.state?.sessionId);

  useEffect(() => {
    history.replace({ state: null });
  }, []);

  return id || '';
};
