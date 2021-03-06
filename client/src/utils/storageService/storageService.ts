import merge from 'lodash/merge';
import omit from 'lodash/omit';
import { StorageKey } from './types';

export class StorageService {
  private readonly appKey = 'pointing-poker-app';

  private storage = process.env.NODE_ENV === 'production'
    ? localStorage
    : sessionStorage;

  public getState = (): Record<StorageKey, any> | null => {
    try {
      return JSON.parse(this.storage.getItem(this.appKey)) || null;
    } catch {
      return null;
    }
  }

  public set = <T = any>(key: StorageKey, value: Partial<T>, mergeProps = false): T => {
    const currentState = this.getState();
    const item = { [key]: value };

    if (mergeProps) {
      item[key] = merge(this.get(key) || {}, value);
    }

    this.storage.setItem(this.appKey, JSON.stringify({
      ...currentState,
      ...item,
    }));

    return this.get(key);
  }

  public removeNested = (key: StorageKey, prop: string): void => {
    const obj = this.get(key);

    if (!obj) {
      return;
    }

    const newState = {
      ...this.getState(),
      [key]: omit(obj, prop),
    };

    this.storage.setItem(this.appKey, JSON.stringify(newState));
  }

  public remove = (key: StorageKey): void => {
    if (this.get(key) == null) {
      return;
    }

    const newState = omit(this.getState(), key);

    this.storage.setItem(this.appKey, JSON.stringify(newState));
  }

  public get = <T = any>(key: StorageKey): T | null => {
    const value = this.getState()?.[key];

    if (value === undefined) {
      return null;
    }

    return value;
  }

  public clearState = (): void =>
    this.storage.removeItem(this.appKey);
}

export default new StorageService();
