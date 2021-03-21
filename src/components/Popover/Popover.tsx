import React, { useRef } from 'react';
import { useOutsideClose } from 'utils/customHooks';
import classNames from 'classnames/bind';
import { AlignType } from 'types/global';
import styles from './Popover.module.scss';

const cx = classNames.bind(styles);

type Props = {
  align?: AlignType;
  onClose: (e?) => void;
}

const Popover: React.FC<Props> = (props) => {
  const { onClose, children, align = AlignType.Left } = props;
  const popoverRef = useRef<HTMLDivElement>(null);

  useOutsideClose(popoverRef, onClose);

  return (
    <div ref={popoverRef} className={cx('popover', `popover--${align}`)}>
      {children}
    </div>
  );
};

export default Popover;
