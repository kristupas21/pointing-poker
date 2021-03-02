import React, { useEffect, useRef } from 'react';
import { FieldType, FormField } from '..';
import Button from '../../Button';
import { IconId } from '../../Icon';

interface Props {
  onRemoveClick: (id: string) => void;
  isRemoveDisabled?: boolean;
  isEditDisabled?: boolean;
  name: string;
  onBlur: (e, id: string, name: string) => void;
  currentValue: string;
  id: string;
  className?: string;
}

const DynamicFormField: React.FC<Props> = (props) => {
  const { name, id, onRemoveClick, isRemoveDisabled, onBlur, currentValue, className, isEditDisabled } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () =>
    inputRef.current && inputRef.current.focus();

  const handleRemoveClick = () =>
    isRemoveDisabled || onRemoveClick(id);

  const handleBlur = (e) => onBlur(e, id, name);

  useEffect(() => {
    currentValue === undefined && handleEditClick();
  }, []);

  return (
    <span className={className}>
      <FormField
        name={name}
        type={FieldType.Input}
        setRef={inputRef}
        onBlur={handleBlur}
        value={currentValue || ''}
        disabled={isEditDisabled}
      />
      <Button icon={IconId.Edit} onClick={handleEditClick} disabled={isEditDisabled} />
      <Button icon={IconId.Delete} onClick={handleRemoveClick} disabled={isRemoveDisabled} />
    </span>
  );
};

export default DynamicFormField;
