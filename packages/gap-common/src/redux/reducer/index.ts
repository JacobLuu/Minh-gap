import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../../utils/history';
import globalStore from '../../containers/Global/reducer';
import loginSlice from '../../containers/Login/reducer';

const rootReducer = combineReducers({
  router: connectRouter(history),
  globalStore,
  loginSlice,
});

export default rootReducer;
