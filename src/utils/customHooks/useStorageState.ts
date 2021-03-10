import { useEffect, useState } from 'react';
import storageService, { StorageKey } from 'utils/storageService';

export default <T>(key: StorageKey, fallback: T): [v: T, set: (v: T) => void] => {
  const [value, setValue] = useState(
    storageService.get(key) as T || fallback
  );

  useEffect(() => {
    storageService.set(key, value);
  }, [value]);

  return [value, setValue];
};
