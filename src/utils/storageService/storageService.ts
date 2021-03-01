import merge from 'lodash/merge';
import omit from 'lodash/omit';
import { StorageKey } from './types';

/**
 * user: User,
 * [sessionId: string]: { useRoles: boolean },
 */

type Key = StorageKey | string;

class StorageService {
  private readonly appKey = 'pointing-poker-app';

  private storage = process.env.NODE_ENV === 'production'
    ? localStorage
    : sessionStorage;

  public getState = (): Record<Key, any> | null => {
    try {
      return JSON.parse(this.storage.getItem(this.appKey)) || null;
    } catch {
      return null;
    }
  }

  public set = (key: Key, value: any, mergeProps = false): void => {
    const currentState = this.getState();
    const item = { [key]: value };

    if (mergeProps) {
      item[key] = merge(this.get(key) || {}, value);
    }

    this.storage.setItem(this.appKey, JSON.stringify({
      ...currentState,
      ...item,
    }));
  }

  public remove = (key: Key): void => {
    if (!this.get(key)) {
      return;
    }

    const newState = omit(this.getState(), key);

    this.storage.setItem(this.appKey, JSON.stringify(newState));
  }

  public get = <T = any>(key: Key): T | null =>
    this.getState()?.[key] || null;

  public clearState = (): void =>
    this.storage.setItem(this.appKey, null);
}

export default new StorageService();