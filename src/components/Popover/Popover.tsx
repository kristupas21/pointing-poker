import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useOutsideClose } from 'utils/customHooks';
import classNames from 'classnames/bind';
import { AlignType } from 'types/global';
import withFocusLock from 'utils/withFocusLock';
import styles from './Popover.module.scss';

const cx = classNames.bind(styles);

type Props = {
  align?: AlignType;
  className?: string;
  onClose: (e?) => void;
}

const Popover: React.FC<Props> = (props) => {
  const { onClose, children, align = AlignType.Left, className } = props;
  const popoverRef = useRef<HTMLDivElement>(null);

  useOutsideClose(popoverRef, onClose);

  return (
    <motion.div
      key="popover"
      ref={popoverRef}
      className={cx('popover', `popover--${align}`, className)}
    >
      {children}
    </motion.div>
  );
};

export default withFocusLock<Props>(Popover);
