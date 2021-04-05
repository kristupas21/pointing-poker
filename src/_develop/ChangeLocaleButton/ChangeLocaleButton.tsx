import React from 'react';
import Button from 'components/Button/Button';
import { setAppLocale } from 'state/app/appActions';
import { useMappedDispatch } from 'utils/customHooks';
import { useSelector } from 'react-redux';
import { getAppLocale } from 'state/app/appStateGetters';

const actions = {
  setLocale: setAppLocale,
};

const ChangeLocaleButton: React.FC = () => {
  const locale = useSelector(getAppLocale);
  const { setLocale } = useMappedDispatch(actions);
  const getOtherLocale = () => (locale === 'lt' ? 'en' : 'lt');

  const handleClick = () => setLocale(getOtherLocale());

  return (
    <Button onClick={handleClick} isOutline>
      Go
      {' '}
      {getOtherLocale().toLocaleUpperCase()}
    </Button>
  );
};

export default ChangeLocaleButton;
