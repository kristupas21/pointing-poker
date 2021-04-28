import React from 'react';
import { Formik } from 'formik';
import { FormProps } from 'utils/form/types';
import { SessionFormData } from '../types';
import { startSessionValidationSchema } from '../validationSchema';
import Form from './Form';

type Props = {
  initialValues: SessionFormData;
  onSubmit: (values: SessionFormData) => void;
};

const StartSessionFormWrapper: React.FC<Props> = (props) => {
  const { initialValues, onSubmit } = props;

  const handleSubmit = (values: SessionFormData) => {
    onSubmit(startSessionValidationSchema.cast(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={false}
      onSubmit={handleSubmit}
      validationSchema={startSessionValidationSchema}
      id="start-session-form"
    >
      {(formikProps: FormProps<SessionFormData>) => <Form {...formikProps} />}
    </Formik>
  );
};

export default StartSessionFormWrapper;
