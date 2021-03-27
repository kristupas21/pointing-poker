import React, { useContext } from 'react';
import { Form, Formik } from 'formik';
import ThemeContext, { Theme } from 'context/Theme';
import { getThemeColor } from 'context/Theme/utils';
import { useText } from 'utils/customHooks';
import classNames from 'classnames/bind';
import { MessageId } from 'lang';
import { FieldType, FormField } from 'components/Form';
import styles from './ThemeSelector.module.scss';

const cx = classNames.bind(styles);

const ThemeSelector: React.FC = () => {
  const { theme, setAppTheme } = useContext(ThemeContext);
  const text = useText();

  return (
    <div>
      <h4>{text('settings.theme.title')}</h4>
      <Formik onSubmit={undefined} initialValues={undefined}>
        <Form>
          {Object.values(Theme).map((name) => (
            <div key={name} className={cx('field')}>
              <FormField
                name={name}
                label={text(`theme.variant.${name}` as MessageId)}
                type={FieldType.Checkbox}
                checked={name === theme}
                onChange={() => setAppTheme(name)}
              />
              <span className={cx('indicator')} style={{ background: getThemeColor(name) }} />
            </div>
          ))}
        </Form>
      </Formik>
    </div>
  );
};

export default ThemeSelector;
