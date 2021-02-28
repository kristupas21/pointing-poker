import React from 'react';
import { Form, Formik } from 'formik';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/global';
import { mapPointValuesToFormData, withPVF } from './utils';
import PointValueField from './PointValueField';
import {
  addSessionPointValue,
  removeSessionPointValue,
  saveSessionPointValue
} from '../../state/session/sessionActions';
import Button from '../../components/Button';
import { IconId } from '../../components/Icon';
import { MAX_POINT_VALUES_COUNT, MIN_POINT_VALUES_COUNT } from './constants';

const mapStateToProps = (state: State) => ({
  pointValues: state.session.pointValues,
});

const mapDispatchToProps = {
  removePointValue: removeSessionPointValue,
  savePointValue: saveSessionPointValue,
  addPointValue: addSessionPointValue,
};

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const PointValuesForm: React.FC<Props> = (props) => {
  const { pointValues, removePointValue, savePointValue, addPointValue } = props;
  const initialValues = mapPointValuesToFormData(pointValues);
  const isRemoveDisabled = pointValues.length <= MIN_POINT_VALUES_COUNT;
  const isAddDisabled = pointValues.length >= MAX_POINT_VALUES_COUNT;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={undefined}
    >
      {({ handleBlur, values, resetForm }) => {
        const submitValues = (e, id: string, name: string) => {
          const value = values[name];

          handleBlur(e);

          if (value) {
            savePointValue({ id, value: values[name] });
          } else {
            resetForm();
          }
        };

        return (
          <Form>
            {pointValues.map((point) => {
              const name = withPVF(point.pos);

              return (
                <PointValueField
                  key={point.id}
                  isRemoveDisabled={isRemoveDisabled}
                  onRemoveClick={removePointValue}
                  onBlur={submitValues}
                  name={name}
                  currentValue={values[name]}
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

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PointValuesForm);
