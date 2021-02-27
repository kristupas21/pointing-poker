import merge from 'lodash/merge';
import omit from 'lodash/omit';

/**
 * user: User,
 * [sessionId: string]: { useRoles: boolean },
 */

class StorageService {
  private readonly appKey = 'pointing-poker-app';

  private storage = process.env.NODE_ENV === 'production'
    ? localStorage
    : sessionStorage;

  public getState = (): Record<string, any> | null => {
    try {
      return JSON.parse(this.storage.getItem(this.appKey)) || null;
    } catch {
      return null;
    }
  }

  public set = (key: string, value: any, mergeProps = false): void => {
    const currentState = this.getState();
    let item = { [key]: value };

    if (mergeProps) {
      item = merge(this.get(key) || {}, item);
    }

    this.storage.setItem(this.appKey, JSON.stringify({
      ...currentState,
      ...item,
    }));
  }

  public remove = (key: string): void => {
    if (!this.get(key)) {
      return;
    }

    const newState = omit(this.getState(), key);

    this.storage.setItem(this.appKey, JSON.stringify(newState));
  }

  public get = <T = any>(key: string): T | null =>
    this.getState()?.[key] || null;

  public clearState = (): void =>
    this.storage.setItem(this.appKey, null);
}

export default new StorageService();
