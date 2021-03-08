export interface ModalState {
  contentProps?: Record<string, any>,
  id: ModalId;
  isOpen: boolean;
}

export enum ModalId {
  Generic = 1,
}
