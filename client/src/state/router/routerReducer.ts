import { connectRouter } from 'connected-react-router';
import history from '../history';

const routerReducer = connectRouter(history);

export default routerReducer;
