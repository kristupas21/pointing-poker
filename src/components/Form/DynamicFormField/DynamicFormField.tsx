import React, { createRef, useEffect, FocusEvent } from 'react';
import Button from 'components/Button';
import { IconId } from 'components/Icon';
import { motion } from 'framer-motion';
import animations from 'utils/animations';
import classNames from 'classnames/bind';
import { FieldType, FormField } from '..';
import { SharedFieldProps } from '../types';
import styles from './DynamicFormField.module.scss';

const cx = classNames.bind(styles);

type Props = SharedFieldProps & {
  onRemoveClick: (id: string) => void;
  isRemoveDisabled?: boolean;
  isEditDisabled?: boolean;
  onBlur: (e: FocusEvent<HTMLInputElement>, id: string, name: string) => void;
  currentValue: string;
}

const DynamicFormField: React.FC<Props> = (props) => {
  const {
    name,
    id,
    onRemoveClick,
    isRemoveDisabled,
    onBlur,
    currentValue,
    isEditDisabled,
    ...fieldProps
  } = props;

  const inputRef = createRef<HTMLInputElement>();

  const handleEditClick = () =>
    inputRef.current && inputRef.current.focus();

  const handleRemoveClick = () =>
    isRemoveDisabled || onRemoveClick(id);

  const handleBlur = (e) => onBlur(e, id, name);

  useEffect(() => {
    currentValue === undefined && handleEditClick();
  }, []);

  return (
    <motion.span key={id} {...animations.simpleOpacity} className={cx('field')}>
      <FormField
        {...fieldProps}
        name={name}
        type={FieldType.Input}
        setRef={inputRef}
        onBlur={handleBlur}
        value={currentValue || ''}
        disabled={isEditDisabled}
        id={id}
      />
      <Button icon={IconId.Edit} onClick={handleEditClick} disabled={isEditDisabled} />
      <Button icon={IconId.Delete} onClick={handleRemoveClick} disabled={isRemoveDisabled} />
    </motion.span>
  );
};

export default DynamicFormField;
