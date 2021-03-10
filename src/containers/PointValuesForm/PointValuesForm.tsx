import React from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import {
  addSessionPointValue,
  removeSessionPointValue,
  saveSessionPointValue
} from 'state/session/sessionActions';
import Button from 'components/Button';
import { IconId } from 'components/Icon';
import DynamicFormField from 'components/Form/DynamicFormField';
import { getSessionPointValues } from 'state/session/sessionStateGetters';
import { useMappedDispatch } from 'utils/customHooks';
import { mapPointValuesToFormData, withPVF } from './utils';
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
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={undefined}
      validationSchema={getPointValuesFormSchema(pointValues)}
    >
      {({ handleBlur, values, resetForm, errors }) => {
        const submitValues = (e, id: string, name: string) => {
          const value = values[name];

          handleBlur(e);

          if (value && !errors[name]) {
            savePointValue({ id, value: values[name] });
          } else {
            resetForm();
          }
        };

        return (
          <Form name="pvf">
            {pointValues.map((point) => {
              const name = withPVF(point.mandatoryId || point.pos);

              return (
                <DynamicFormField
                  key={point.id}
                  isRemoveDisabled={isRemoveDisabled || !!point.mandatoryId}
                  onRemoveClick={removePointValue}
                  onBlur={submitValues}
                  name={name}
                  currentValue={values[name]}
                  isEditDisabled={!!point.mandatoryId}
                  {...point}
                />
              );
            })}
            <Button icon={IconId.Add} onClick={addPointValue} disabled={isAddDisabled} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default PointValuesForm;
