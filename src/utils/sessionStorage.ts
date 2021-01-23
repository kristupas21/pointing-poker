interface SessionStorageClass {
  readonly appKey: string;
  clearState: () => void;
  getState: () => Record<string, any>;
  getItem: (key: string) => any;
  setItem: (item: Record<string, any>) => void;
}

class SessionStorage implements SessionStorageClass {
  readonly appKey = 'pointing-poker-app';

  public getState = () => JSON.parse(sessionStorage.getItem(this.appKey)) || null;

  public setItem = (item) => {
    const currentState = this.getState();

    sessionStorage.setItem(this.appKey, JSON.stringify({
      ...currentState,
      ...item,
    }));
  }

  public getItem = (key) => this.getState()?.[key] || null;

  public clearState = () => sessionStorage.setItem(this.appKey, null);
}

export default new SessionStorage();
