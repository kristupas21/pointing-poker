import React, { useContext } from 'react';
import { Form, Formik } from 'formik';
import ThemeContext from 'context/Theme';
import { FieldType, FormField } from 'components/Form';

const ModeSelector: React.FC = () => {
  const { toggleInverted, isInverted } = useContext(ThemeContext);

  return (
    <div>
      <Formik onSubmit={undefined} initialValues={undefined}>
        <Form>
          <FormField
            name="darkMode"
            type={FieldType.Switch}
            checked={isInverted}
            onChange={toggleInverted}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default ModeSelector;
