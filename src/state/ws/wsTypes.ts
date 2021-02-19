export interface WSMessage<T = never> {
  eventType: string;
  body: T;
}

export type WSEventMapItem = {
  event: string,
  listener: (...args: any) => Generator,
  emitter: (...args: any) => Generator,
};
