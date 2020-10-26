import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import { msg } from './lang/en';
import 'styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App name={msg('app.title')} />
  </React.StrictMode>,
  document.getElementById('root')
);
