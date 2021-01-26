export interface ModalState {
  contentProps?: Record<string, any>,
  id: ModalId;
  isOpen: boolean;
  type: ModalType;
}

export enum ModalType {
  Default = 'default',
  Notification = 'notification',
}

export enum ModalId {
  Generic = 1,
}
