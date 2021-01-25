export interface ModalState {
  contentProps?: Record<string, any>,
  id: ModalId;
  isOpen: boolean;
  type: ModalType;
}

export enum ModalType {
  Default = 1,
  Notification,
}

export enum ModalId {
  Default = 1,
}
