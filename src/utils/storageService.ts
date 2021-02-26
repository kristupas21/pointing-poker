import merge from 'lodash/merge';

/**
 * user: User,
 * [sessionId: string]: { useRoles: boolean },
 */

class StorageService {
  private readonly appKey = 'pointing-poker-app';

  public getState = (): Record<string, any> | null => {
    try {
      return JSON.parse(sessionStorage.getItem(this.appKey)) || null;
    } catch {
      return null;
    }
  }

  public setItem = (itemName: string, value: any, mergeProps = false): void => {
    const currentState = this.getState();
    let item = { [itemName]: value };

    if (mergeProps) {
      item = merge(this.getItem(itemName) || {}, item);
    }

    sessionStorage.setItem(this.appKey, JSON.stringify({
      ...currentState,
      ...item,
    }));
  }

  public getItem = <T = any>(key: string): T | null =>
    this.getState()?.[key] || null;

  public clearState = (): void =>
    sessionStorage.setItem(this.appKey, null);
}

export default new StorageService();
