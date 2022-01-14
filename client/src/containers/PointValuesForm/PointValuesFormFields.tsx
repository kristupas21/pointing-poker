import React, { FocusEvent } from 'react';
import { Form } from 'formik';
import { useSelector } from 'react-redux';
import { FormProps } from 'utils/form/types';
import { calcFixedNumber } from 'utils/mathOps';
import { removeSessionPointValue, saveSessionPointValue } from 'state/session/sessionActions';
import { useMappedDispatch } from 'utils/customHooks';
import DynamicFormField from 'components/Form/DynamicFormField';
import { FieldSize, FieldType } from 'components/Form';
import { getSessionPointValues } from 'state/session/sessionStateGetters';
import { DynamicFieldType } from 'components/Form/DynamicFormField/DynamicFormField';
import classNames from 'classnames/bind';
import { withPVF } from './utils';
import { MIN_POINT_VALUES_COUNT } from './constants';
import styles from '../SessionForms/SessionForms.module.scss';

const cx = classNames.bind(styles);

const actions = {
  removePointValue: removeSessionPointValue,
  savePointValue: saveSessionPointValue,
};

type Props = FormProps<Record<string, any>> & {
  isReadonly: boolean;
};

const PointValuesFormFields: React.FC<Props> = (props) => {
  const {
    handleBlur,
    setFieldValue,
    values,
    resetForm,
    errors,
    isReadonly,
  } = props;

  const pointValues = useSelector(getSessionPointValues);
  const { savePointValue, removePointValue } = useMappedDispatch(actions);
  const isRemoveDisabled = pointValues.length <= MIN_POINT_VALUES_COUNT;

  const submitValues = (e: FocusEvent<HTMLInputElement>, id: string, name: string) => {
    const inputValue = values[name];

    handleBlur(e);

    if (inputValue != null && inputValue !== '' && !errors[name]) {
      const value = calcFixedNumber.ofTypeString(inputValue);

      setFieldValue(name, value);
      savePointValue({ id, value });
    } else {
      resetForm();
    }
  };

  return (
    <Form className={cx('form', 'form--points')} name={withPVF('form')} noValidate>
      {pointValues.map((point) => {
        const { id, immutable, pos } = point;
        const name = withPVF(immutable ? id : pos);

        return (
          <DynamicFormField
            key={id}
            id={id}
            isRemoveDisabled={isRemoveDisabled}
            onRemoveClick={removePointValue}
            onBlur={submitValues}
            name={name}
            currentValue={values[name]}
            isEditDisabled={immutable}
            fieldSize={FieldSize.Small}
            fieldType={immutable ? FieldType.Input : FieldType.Number}
            isReadonly={isReadonly}
            type={DynamicFieldType.Point}
          />
        );
      })}
    </Form>
  );
};

export default PointValuesFormFields;
