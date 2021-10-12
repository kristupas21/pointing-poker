import React, { RefObject } from 'react';
import classNames from 'classnames/bind';
import { FieldAttributes } from 'formik';
import { FieldType, SharedFieldProps } from '../types';
import Input, { InputProps } from '../Input';
import Select, { SelectProps } from '../Select';
import Checkbox, { CheckboxProps } from '../Checkbox';
import Switch, { SwitchProps } from '../Switch';
import NumberInput, { NumberInputProps } from '../NumberInput';
import styles from './FormField.module.scss';

const cx = classNames.bind(styles);

type Props = FieldAttributes<any> & SharedFieldProps & {
  setRef?: RefObject<any>;
  block?: boolean;
  type: FieldType;
  classes?: {
    field?: string;
    input?: string;
    wrapper?: string;
  };
}

const FormField: React.FC<Props> = (props) => {
  const { type, block, setRef, classes = {}, isReadonly, ...fieldProps } = props;

  const renderContent = () => {
    switch (type) {
      case FieldType.Input:
        return (
          <Input
            {...fieldProps as InputProps}
            ref={setRef}
            autoComplete="off"
            isText={isReadonly}
            wrapperClassName={classes.input}
            className={classes.field}
          />
        );
      case FieldType.Select:
        return (
          <Select
            {...fieldProps as SelectProps}
            ref={setRef}
            autoComplete="off"
          />
        );
      case FieldType.Number:
        return (
          <NumberInput
            {...fieldProps as NumberInputProps}
            ref={setRef}
            autoComplete="off"
            isText={isReadonly}
          />
        );
      case FieldType.Checkbox:
        return (
          <Checkbox
            {...fieldProps as CheckboxProps}
            ref={setRef}
          />
        );
      case FieldType.Switch:
        return (
          <Switch
            {...fieldProps as SwitchProps}
            ref={setRef}
          />
        );
      default:
        return null;
    }
  };

  return (
    <span className={cx('field', `field--${type}`, { 'field--block': block }, classes.wrapper)}>
      {renderContent()}
    </span>
  );
};

export default FormField;
