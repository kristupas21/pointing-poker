import React from 'react';
import { Form, Formik } from 'formik';
import { Theme, WithTheme, withThemeContext } from 'containers/Theme';
import { useText } from 'utils/customHooks';
import classNames from 'classnames/bind';
import { MessageId } from 'lang';
import { FieldType, FormField } from 'components/Form';
import styles from './ThemeSelector.module.scss';
import { getThemeColor } from '../Theme/utils';

const cx = classNames.bind(styles);

type Props = WithTheme;

const ThemeSelector: React.FC<Props> = (props) => {
  const { theme, setAppTheme } = props;
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

export default withThemeContext(ThemeSelector);
