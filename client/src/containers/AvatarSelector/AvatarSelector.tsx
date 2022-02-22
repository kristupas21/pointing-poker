import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePopper } from 'react-popper';
import { motion } from 'framer-motion';
import { getSessionUserAvatarId } from 'state/session/sessionStateGetters';
import { modifySessionUser } from 'state/session/sessionActions';
import { useMappedDispatch, useOutsideClose } from 'utils/customHooks';
import Avatar from 'components/Avatar';
import classNames from 'classnames/bind';
import Button from 'components/Button';
import { wsModifySessionUser } from 'state/ws/wsActions';
import animations from 'utils/animations';
import AvatarOptions from './AvatarOptions';
import selectorStyles from './AvatarSelector.module.scss';

const cx = classNames.bind(selectorStyles);

type Actions = {
  modifyUser: typeof modifySessionUser;
}

const actions = {
  modifyUser: [modifySessionUser, wsModifySessionUser],
} as unknown as Actions;

type Props = {
  className?: string;
}

const AvatarSelector: React.FC<Props> = (props) => {
  const { className } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const avatarId = useSelector(getSessionUserAvatarId);
  const { modifyUser } = useMappedDispatch(actions);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
    ],
  });

  const handleAvatarSelect = (params) => {
    modifyUser(params);
    setPopoverOpen(false);
  };

  useOutsideClose(wrapperRef, () => setPopoverOpen(false));

  return (
    <div ref={wrapperRef}>
      <div className={cx('avatar-selector', className)} ref={setReferenceElement}>
        <Button
          onClick={() => {
            setPopoverOpen(!isPopoverOpen);
          }}
        >
          <Avatar id={avatarId} />
        </Button>
        {isPopoverOpen && (
          <motion.div
            {...animations.simpleOpacity}
            transition={{ duration: 0.2 }}
            ref={setPopperElement}
            className={cx('avatar-selector__popover-wrapper')}
            style={styles.popper}
            {...attributes.popper}
          >
            <div className={cx('avatar-selector__popover')}>
              <AvatarOptions onSelect={handleAvatarSelect} value={avatarId} />
            </div>
            <div
              className={cx('avatar-selector__popover-arrow')}
              ref={setArrowElement}
              style={styles.arrow}
            >
              <div className={cx('avatar-selector__popover-arrow-inner')} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AvatarSelector;
