import React from 'react';
import ReactDOM from 'react-dom';
import MESSAGES from 'lang/en';
import 'styles/index.scss';
import App from 'containers/App';

ReactDOM.render(
  <React.StrictMode>
    <App name={MESSAGES['app.title']} />
  </React.StrictMode>,
  document.getElementById('root')
);
