import React, { createRef, useEffect, FocusEvent } from 'react';
import Button from 'components/Button';
import { IconId } from 'components/Icon';
import { motion } from 'framer-motion';
import animations from 'utils/animations';
import classNames from 'classnames/bind';
import { FieldType, FormField } from '..';
import styles from './DynamicFormField.module.scss';
import { InputProps } from '../Input';

const cx = classNames.bind(styles);

type Props = Omit<InputProps, 'onBlur'> & {
  onRemoveClick: (id: string) => void;
  isRemoveDisabled?: boolean;
  isEditDisabled?: boolean;
  onBlur: (e: FocusEvent<HTMLInputElement>, id: string, name: string) => void;
  currentValue: string;
  fieldType?: FieldType.Input | FieldType.Number;
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
    fieldType = FieldType.Input,
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
        type={fieldType}
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
