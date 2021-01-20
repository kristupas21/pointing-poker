import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import reducers from './reducers';
import history from './history';

const middleware = [createSagaMiddleware(), routerMiddleware(history)];
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
);
