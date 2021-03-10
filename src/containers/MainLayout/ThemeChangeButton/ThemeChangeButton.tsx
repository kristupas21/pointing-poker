import React from 'react';
import { WithTheme, withThemeContext } from 'containers/Theme';
import Button from 'components/Button';
import { useText } from 'utils/customHooks';

type Props = WithTheme;

const ThemeChangeButton: React.FC<Props> = (props) => {
  const { toggleTheme, theme } = props;
  const text = useText();
  const textId = theme === 'dark' ? 'global.lightMode' : 'global.darkMode';

  return (
    <Button onClick={toggleTheme}>
      {text(textId)}
    </Button>
  );
};

export default withThemeContext<Props>(ThemeChangeButton);
