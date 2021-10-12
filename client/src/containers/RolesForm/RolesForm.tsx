import React, { useState } from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import {
  addSessionRole,
  resetSessionRoles,
  clearSessionPlaceholders,
} from 'state/session/sessionActions';
import Button, { ButtonVariant } from 'components/Button';
import { IconId } from 'components/Icon';
import { getSessionRoles } from 'state/session/sessionStateGetters';
import { useMappedDispatch, useText } from 'utils/customHooks';
import { DEFAULT_USER_ROLES } from 'utils/userRoles';
import { FormProps } from 'utils/form/types';
import classNames from 'classnames/bind';
import { focusRolePlaceholder, mapRolesToFormData } from './utils';
import { MAX_ROLES_COUNT } from './constants';
import { getRolesFormSchema } from './validationSchema';
import RolesFormFields from './RolesFormFields';
import styles from '../SessionForms/SessionForms.module.scss';

const cx = classNames.bind(styles);

const actions = {
  addRole: addSessionRole,
  clearPlaceholders: clearSessionPlaceholders,
  resetRoles: resetSessionRoles,
};

const RolesForm: React.FC = () => {
  const roles = useSelector(getSessionRoles);
  const { addRole, resetRoles, clearPlaceholders } = useMappedDispatch(actions);
  const [isEditOn, setEditOn] = useState(false);
  const initialValues = mapRolesToFormData(roles);
  const text = useText();
  const isAddDisabled = !isEditOn || roles.length >= MAX_ROLES_COUNT;

  const handleEditClick = () => {
    isEditOn && clearPlaceholders();
    setEditOn((wasEditOn) => !wasEditOn);
  };

  const handleAdd = () => {
    addRole();
    setTimeout(focusRolePlaceholder);
  };

  return (
    <div className={cx('form', 'form--roles', { 'form--edit-mode': isEditOn })}>
      <div className={cx('form__title')}>
        <h4 className={cx('form__title-text')}>{text('session.roles')}</h4>
        <div className={cx('form__title-controls')}>
          <Button
            onClick={handleEditClick}
            icon={isEditOn ? IconId.Checkmark : IconId.Edit}
            variant={ButtonVariant.Primary}
            round
          />
          <Button
            onClick={resetRoles}
            disabled={isEqual(roles, DEFAULT_USER_ROLES)}
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
        validationSchema={getRolesFormSchema(roles)}
      >
        {(formikProps: FormProps<Record<string, string>>) => (
          <RolesFormFields {...formikProps} isReadonly={!isEditOn} />
        )}
      </Formik>
      {isEditOn && (
        <Button
          variant={ButtonVariant.Primary}
          icon={IconId.Add}
          onClick={handleAdd}
          disabled={isAddDisabled}
          round
          className={cx('form__add-button')}
        />
      )}
    </div>
  );
};

export default RolesForm;
