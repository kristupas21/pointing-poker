import React from 'react';
import { Formik } from 'formik';
import { SubmitHandler, FormProps } from 'utils/form/types';
import { SessionFormData } from '../types';
import { joinSessionValidationSchema } from '../validationSchema';
import Form from './Form';

type Props = {
  initialValues: SessionFormData;
  onSubmit: SubmitHandler<SessionFormData>
};

const JoinSessionFormWrapper: React.FC<Props> = (props) => {
  const { initialValues, onSubmit } = props;

  const handleSubmit = (values: SessionFormData, helpers) => {
    onSubmit(joinSessionValidationSchema.cast(values), helpers);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={false}
      onSubmit={handleSubmit}
      validationSchema={joinSessionValidationSchema}
      id="join-session-form"
    >
      {(formikProps: FormProps<SessionFormData>) => <Form {...formikProps} /> }
    </Formik>
  );
};

export default JoinSessionFormWrapper;
