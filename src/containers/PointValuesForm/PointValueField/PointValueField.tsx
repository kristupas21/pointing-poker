import React, { useRef } from 'react';
import { FieldType, FormField } from '../../../components/Form';
import { PointValue } from '../../../utils/pointValues/types';
import Button from '../../../components/Button';
import { IconId } from '../../../components/Icon';
import { withPVF } from '../utils';

interface Props extends PointValue {
  onRemoveClick: (id: string) => void;
  isRemoveDisabled: boolean;
  onBlur: (e, id: string, name: string) => void;
}

const PointValueField: React.FC<Props> = (props) => {
  const { pos, id, onRemoveClick, isRemoveDisabled, onBlur } = props;
  const name = withPVF(pos);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () =>
    inputRef.current && inputRef.current.focus();

  const handleRemoveClick = () =>
    isRemoveDisabled || onRemoveClick(id);

  const handleBlur = (e) => onBlur(e, id, name);

  return (
    <span>
      <FormField
        name={name}
        type={FieldType.Input}
        setRef={inputRef}
        onBlur={handleBlur}
      />
      <Button icon={IconId.Edit} onClick={handleEditClick} />
      <Button icon={IconId.Delete} onClick={handleRemoveClick} disabled={isRemoveDisabled} />
    </span>
  );
};

export default PointValueField;
