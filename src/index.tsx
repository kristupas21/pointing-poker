import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import { getTranslation } from './components/Text/TextUtils';

ReactDOM.render(
  <React.StrictMode>
    <App name={getTranslation('app.title')} />
  </React.StrictMode>,
  document.getElementById('root')
);
