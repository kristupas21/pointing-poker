import React, { useRef, FocusEvent } from 'react';
import Button, { ButtonVariant } from 'components/Button';
import { IconId } from 'components/Icon';
import { motion } from 'framer-motion';
import animations from 'utils/animations';
import classNames from 'classnames/bind';
import { FIELD_VALUE_PLACEHOLDER } from 'utils/form/constants';
import { FieldType, FormField } from '..';
import styles from './DynamicFormField.module.scss';
import { InputProps } from '../Input';

const cx = classNames.bind(styles);

type Props = Omit<InputProps, 'onBlur'> & {
  onRemoveClick: (id: string) => void;
  isRemoveDisabled?: boolean;
  isEditDisabled?: boolean;
  onBlur: (e: FocusEvent<HTMLInputElement>, id: string, name?: string) => void;
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
    isReadonly,
    ...fieldProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemoveClick = () =>
    isRemoveDisabled || onRemoveClick(id);

  const handleBlur = (e) => onBlur(e, id, name);

  const getFieldValue = () =>
    ((currentValue && currentValue !== FIELD_VALUE_PLACEHOLDER) ? currentValue : '');

  return (
    <motion.span key={id} {...animations.simpleOpacity} className={cx('field')}>
      <FormField
        {...fieldProps}
        name={name}
        type={fieldType}
        setRef={inputRef}
        onBlur={handleBlur}
        value={getFieldValue()}
        disabled={isEditDisabled}
        id={id}
        isReadonly={isReadonly}
      />
      {isReadonly || (
        <Button
          onClick={handleRemoveClick}
          disabled={isRemoveDisabled}
          icon={IconId.Delete}
          variant={ButtonVariant.Primary}
          round
        />
      )}
    </motion.span>
  );
};

export default DynamicFormField;
