import { useEffect, useState } from 'react';
import { isAsteriskKey, isNumberKey, isQuestionKey } from 'utils/keyboardUtils';
import { POINT_VALUE_INFINITY, POINT_VALUE_UNKNOWN } from 'utils/pointValues/constants';
import { Timeout } from 'globalTypes';

declare const document;

const WAIT_TIME_MS = 500;

let timeout: Timeout;

export default <T extends HTMLElement>(callback: (v: string) => void, el: T = document) => {
  const [innerValue, setInnerValue] = useState('');
  const [actualValue, setActualValue] = useState('');

  const concatAndSetInnerValue = (next: string): void =>
    setInnerValue((prev) => `${prev}${next}`);

  const updateActualValue = (): void => {
    setActualValue(innerValue);
    clearTimeout(timeout);
  };

  useEffect(() => {
    clearTimeout(timeout);

    if (innerValue) {
      timeout = setTimeout(updateActualValue, WAIT_TIME_MS);
    }
  }, [innerValue]);

  useEffect(() => {
    if (actualValue) {
      callback(actualValue);
      setActualValue('');
    }

    setInnerValue('');
  }, [actualValue]);

  useEffect(() => {
    const handleKeydown = (e): void => {
      if (isNumberKey(e)) return concatAndSetInnerValue(e.key);
      if (isAsteriskKey(e)) return setActualValue(POINT_VALUE_INFINITY);
      if (isQuestionKey(e)) return setActualValue(POINT_VALUE_UNKNOWN);

      return undefined;
    };

    el.addEventListener('keydown', handleKeydown);

    return () => el.removeEventListener('keydown', handleKeydown);
  }, []);
};
