import React, { FocusEvent } from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { addSessionPointValue, removeSessionPointValue, saveSessionPointValue } from 'state/session/sessionActions';
import Button from 'components/Button';
import { IconId } from 'components/Icon';
import DynamicFormField from 'components/Form/DynamicFormField';
import { getSessionPointValues } from 'state/session/sessionStateGetters';
import { useMappedDispatch } from 'utils/customHooks';
import { AnimatePresence } from 'framer-motion';
import { FieldSize, FieldType } from 'components/Form';
import { mapPointValuesToFormData, normalizePoint, withPVF } from './utils';
import { MAX_POINT_VALUES_COUNT, MIN_POINT_VALUES_COUNT } from './constants';
import { getPointValuesFormSchema } from './validationSchema';

const actions = {
  removePointValue: removeSessionPointValue,
  savePointValue: saveSessionPointValue,
  addPointValue: addSessionPointValue,
};

const PointValuesForm: React.FC = () => {
  const { removePointValue, savePointValue, addPointValue } = useMappedDispatch(actions);
  const pointValues = useSelector(getSessionPointValues);
  const initialValues = mapPointValuesToFormData(pointValues);
  const isRemoveDisabled = pointValues.length <= MIN_POINT_VALUES_COUNT;
  const isAddDisabled = pointValues.length >= MAX_POINT_VALUES_COUNT;

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={undefined}
        validationSchema={getPointValuesFormSchema(pointValues)}
      >
        {({ handleBlur, setFieldValue, values, resetForm, errors }) => {
          const submitValues = (e: FocusEvent<HTMLInputElement>, id: string, name: string) => {
            const inputValue = values[name];

            handleBlur(e);

            if (inputValue && !errors[name]) {
              const value = normalizePoint(inputValue);

              setFieldValue(name, value);
              savePointValue({ id, value });
            } else {
              resetForm();
            }
          };

          return (
            <Form name={withPVF('form')}>
              <AnimatePresence>
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
                    />
                  );
                })}
              </AnimatePresence>
            </Form>
          );
        }}
      </Formik>
      <Button icon={IconId.Add} onClick={addPointValue} disabled={isAddDisabled} />
    </>
  );
};

export default PointValuesForm;
