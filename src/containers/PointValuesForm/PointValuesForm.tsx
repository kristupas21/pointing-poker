import React from 'react';
import { Form, Formik } from 'formik';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/global';
import { mapPointValuesToFormData } from './utils';
import PointValueField from './PointValueField';
import { removeSessionPointValue, saveSessionPointValue } from '../../state/session/sessionActions';

const mapStateToProps = (state: State) => ({
  pointValues: state.session.pointValues,
});

const mapDispatchToProps = {
  removePointValue: removeSessionPointValue,
  savePointValue: saveSessionPointValue,
};

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const PointValuesForm: React.FC<Props> = (props) => {
  const { pointValues, removePointValue, savePointValue } = props;
  const initialValues = mapPointValuesToFormData(pointValues);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={undefined}
    >
      {({ handleBlur, values }) => {
        const submitValues = (e, id: string, name: string) => {
          handleBlur(e);
          savePointValue({ id, value: values[name] });
        };

        return (
          <Form>
            {pointValues.map((point) => (
              <PointValueField
                key={point.id}
                isRemoveDisabled={pointValues.length < 3}
                onRemoveClick={removePointValue}
                onBlur={submitValues}
                {...point}
              />
            ))}
          </Form>
        );
      }}
    </Formik>
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PointValuesForm);
