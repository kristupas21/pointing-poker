export interface WSMessage<T = never> {
  body: T;
  sessionId: string;
}

export type WSEventMapItem = {
  event: string;
  listener: (...args: any) => Generator;
  emitterData?: (...args: any) => Generator;
  debounced?: boolean;
  evaluatePermission?: (...args: any) => Generator;
};
