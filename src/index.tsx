import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from 'containers/App';
import store from './state/store';
import history from './state/history';
import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App name="Pointing Poker" />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
