import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from 'containers/App';
import store from 'state/store';
import history from 'state/history';
import { ThemeContextProvider } from 'context/Theme';
import { BreakpointsContextProvider } from 'context/Breakpoints';
import 'styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <BreakpointsContextProvider>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </BreakpointsContextProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
