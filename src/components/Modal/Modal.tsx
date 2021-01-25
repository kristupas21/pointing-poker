import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ReactModal from 'react-modal';
import { State } from '../../types/global';

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps;

const Modal: React.FC<Props> = (props) => {
  const { isOpen, type, id, contentProps } = props;

  return (
    <ReactModal isOpen={isOpen}>
      <div>{type}</div>
      <div>{id}</div>
      <div>{contentProps}</div>
    </ReactModal>
  );
};

const mapStateToProps = (state: State) => ({ ...state.modal });

const connector = connect(mapStateToProps);

export default connector(Modal);
