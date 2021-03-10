import React, { ComponentType } from 'react';
import { ModalId } from 'state/modal/modalModel';

type ModalCloser = { closeModal: typeof import('../state/modal/modalActions').closeModal };

const Generic: React.FC = () => <span />;

const modalContents: Record<ModalId, ComponentType<any>> = {
  [ModalId.Generic]: Generic,
};

function getModalContent<T extends ModalCloser>(id: ModalId) {
  return (modalContents[id] || Generic) as ComponentType<T>;
}

export default getModalContent;
