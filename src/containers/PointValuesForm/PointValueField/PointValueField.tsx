import React, { useEffect, useRef } from 'react';
import { FieldType, FormField } from '../../../components/Form';
import { PointValue } from '../../../utils/pointValues/types';
import Button from '../../../components/Button';
import { IconId } from '../../../components/Icon';

interface Props extends PointValue {
  onRemoveClick: (id: string) => void;
  isRemoveDisabled: boolean;
  name: string;
  onBlur: (e, id: string, name: string) => void;
  currentValue: string;
}

const PointValueField: React.FC<Props> = (props) => {
  const { name, id, onRemoveClick, isRemoveDisabled, onBlur, currentValue } = props;
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
    <span>
      <FormField
        name={name}
        type={FieldType.Input}
        setRef={inputRef}
        onBlur={handleBlur}
        value={currentValue || ''}
      />
      <Button icon={IconId.Edit} onClick={handleEditClick} />
      <Button icon={IconId.Delete} onClick={handleRemoveClick} disabled={isRemoveDisabled} />
    </span>
  );
};

export default PointValueField;
