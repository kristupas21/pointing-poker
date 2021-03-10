import React, { createRef, useEffect } from 'react';
import Button from 'components/Button';
import { IconId } from 'components/Icon';
import { FieldType, FormField } from '..';

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
