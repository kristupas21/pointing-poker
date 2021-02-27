import React from 'react';
import { WithTheme, withThemeContext } from '../../Theme';
import Text from '../../../components/Text/Text';
import Button from '../../../components/Button';

type Props = WithTheme;

const ThemeChangeButton: React.FC<Props> = (props) => {
  const { toggleTheme, theme } = props;
  const textId = theme === 'dark' ? 'global.lightMode' : 'global.darkMode';

  return (
    <Button onClick={toggleTheme}>
      <Text id={textId} />
    </Button>
  );
};

export default withThemeContext<Props>(ThemeChangeButton);
