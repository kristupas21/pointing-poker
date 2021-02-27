import { useEffect, useState } from 'react';
import storageService from '../storageService';

export default <T>(key: string, fallback: T): [v: T, set: (v: T) => void] => {
  const [value, setValue] = useState(
    storageService.get(key) as T || fallback
  );

  useEffect(() => {
    storageService.set(key, value);
  }, [value]);

  return [value, setValue];
};
