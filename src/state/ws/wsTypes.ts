export interface WSMessage<T = never> {
  body: T;
  sessionId: string;
}

export type WSEventMapItem = {
  event: string,
  listener: (...args: any) => Generator,
  emitter: (...args: any) => Generator,
};
