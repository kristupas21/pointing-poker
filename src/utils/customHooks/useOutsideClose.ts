import { RefObject, useEffect } from 'react';
import { isEscapeKey } from '../keyboardUtils';

export default <T extends HTMLElement>(ref: RefObject<T>, callback: (e?) => void): void => {
  useEffect(() => {
    const mouseHandler = (e) => {
      ref.current?.contains(e.target) || callback(e);
    };

    const keyboardHandler = (e) => {
      isEscapeKey(e) && callback(e);
    };

    window.addEventListener('mousedown', mouseHandler);
    window.addEventListener('keydown', keyboardHandler);

    return () => {
      window.removeEventListener('mousedown', mouseHandler);
      window.removeEventListener('keydown', keyboardHandler);
    };
  }, []);
};
