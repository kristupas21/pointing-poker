import React, { useState } from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import {
  addSessionPointValue,
  resetSessionPointValues, clearSessionPlaceholders,
} from 'state/session/sessionActions';
import Button, { ButtonVariant } from 'components/Button';
import { IconId } from 'components/Icon';
import { getSessionPointValues } from 'state/session/sessionStateGetters';
import { useMappedDispatch, useText } from 'utils/customHooks';
import { DEFAULT_POINT_VALUES } from 'utils/pointValues/constants';
import { FormProps } from 'utils/form/types';
import classNames from 'classnames/bind';
import { focusPointValuePlaceholder, mapPointValuesToFormData } from './utils';
import { MAX_POINT_VALUES_COUNT } from './constants';
import { getPointValuesFormSchema } from './validationSchema';
import PointValuesFormFields from './PointValuesFormFields';
import styles from '../SessionForms/SessionForms.module.scss';

const cx = classNames.bind(styles);

const actions = {
  addPointValue: addSessionPointValue,
  clearPlaceholders: clearSessionPlaceholders,
  resetPointValues: resetSessionPointValues,
};

const PointValuesForm: React.FC = () => {
  const pointValues = useSelector(getSessionPointValues);
  const { addPointValue, resetPointValues, clearPlaceholders } = useMappedDispatch(actions);
  const [isEditOn, setEditOn] = useState(false);
  const text = useText();
  const initialValues = mapPointValuesToFormData(pointValues);
  const isAddDisabled = !isEditOn || pointValues.length >= MAX_POINT_VALUES_COUNT;

  const handleEditClick = () => {
    isEditOn && clearPlaceholders();
    setEditOn((wasEditOn) => !wasEditOn);
  };

  const handleAdd = () => {
    addPointValue();
    setTimeout(focusPointValuePlaceholder);
  };

  return (
    <div className={cx('form')}>
      <div className={cx('form__title')}>
        <h4 className={cx('form__title-text')}>{text('session.pointValues')}</h4>
        <div className={cx('form__title-controls')}>
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
        </div>
      </div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={undefined}
        validationSchema={getPointValuesFormSchema(pointValues)}
      >
        {(formikProps: FormProps<Record<string, any>>) => (
          <PointValuesFormFields {...formikProps} isReadonly={!isEditOn} />
        )}
      </Formik>
      {isEditOn && (
        <Button
          onClick={handleAdd}
          disabled={isAddDisabled}
          icon={IconId.Add}
          variant={ButtonVariant.Primary}
          round
          className={cx('form__add-button')}
        />
      )}
    </div>
  );
};

export default PointValuesForm;
