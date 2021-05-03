import React, { FocusEvent, useState } from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import {
  addSessionPointValue,
  removeSessionPointValue,
  saveSessionPointValue,
  resetSessionPointValues, clearSessionPlaceholders,
} from 'state/session/sessionActions';
import Button, { ButtonVariant } from 'components/Button';
import { IconId } from 'components/Icon';
import DynamicFormField from 'components/Form/DynamicFormField';
import { getSessionPointValues } from 'state/session/sessionStateGetters';
import { useMappedDispatch, useText } from 'utils/customHooks';
import { FieldSize, FieldType } from 'components/Form';
import { DEFAULT_POINT_VALUES } from 'utils/pointValues/constants';
import { calcFixedNumber } from 'utils/mathOps';
import { mapPointValuesToFormData, withPVF } from './utils';
import { MAX_POINT_VALUES_COUNT, MIN_POINT_VALUES_COUNT } from './constants';
import { getPointValuesFormSchema } from './validationSchema';

const actions = {
  removePointValue: removeSessionPointValue,
  savePointValue: saveSessionPointValue,
  addPointValue: addSessionPointValue,
  resetPointValues: resetSessionPointValues,
  clearPlaceholders: clearSessionPlaceholders,
};

const PointValuesForm: React.FC = () => {
  const {
    removePointValue,
    savePointValue,
    addPointValue,
    resetPointValues,
    clearPlaceholders,
  } = useMappedDispatch(actions);
  const pointValues = useSelector(getSessionPointValues);
  const [isEditOn, setEditOn] = useState(false);
  const text = useText();
  const initialValues = mapPointValuesToFormData(pointValues);
  const isRemoveDisabled = pointValues.length <= MIN_POINT_VALUES_COUNT;
  const isAddDisabled = !isEditOn || pointValues.length >= MAX_POINT_VALUES_COUNT;

  const handleEditClick = () => {
    isEditOn && clearPlaceholders();
    setEditOn((wasEditOn) => !wasEditOn);
  };

  return (
    <>
      <h4>{text('session.pointValues')}</h4>
      <Button
        onClick={handleEditClick}
        icon={isEditOn ? IconId.Checkmark : IconId.Edit}
        variant={ButtonVariant.Primary}
        round
      />
      <Button
        onClick={resetPointValues}
        disabled={isEqual(pointValues, DEFAULT_POINT_VALUES)}
        icon={IconId.Reset}
        variant={ButtonVariant.Primary}
        round
      />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={undefined}
        validationSchema={getPointValuesFormSchema(pointValues)}
      >
        {({
          handleBlur,
          setFieldValue,
          values,
          resetForm,
          errors
        }) => {
          const submitValues = (e: FocusEvent<HTMLInputElement>, id: string, name: string) => {
            const inputValue = values[name];

            handleBlur(e);

            if (inputValue && !errors[name]) {
              const value = calcFixedNumber.ofTypeString(inputValue);

              setFieldValue(name, value);
              savePointValue({ id, value });
            } else {
              resetForm();
            }
          };

          return (
            <Form name={withPVF('form')} noValidate>
              {pointValues.map((point) => {
                const { id, mandatoryId, pos } = point;
                const name = withPVF(mandatoryId || pos);

                return (
                  <DynamicFormField
                    key={id}
                    id={id}
                    isRemoveDisabled={isRemoveDisabled || !!mandatoryId}
                    onRemoveClick={removePointValue}
                    onBlur={submitValues}
                    name={name}
                    currentValue={values[name]}
                    isEditDisabled={!!mandatoryId}
                    fieldSize={FieldSize.Small}
                    fieldType={mandatoryId ? FieldType.Input : FieldType.Number}
                    isReadonly={!isEditOn}
                  />
                );
              })}
            </Form>
          );
        }}
      </Formik>
      <Button
        onClick={addPointValue}
        disabled={isAddDisabled}
        icon={IconId.Add}
        variant={ButtonVariant.Primary}
        round
      />
    </>
  );
};

export default PointValuesForm;
