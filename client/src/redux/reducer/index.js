import { combineReducers } from 'redux';
import auth from './authReducer';
import product from './productReducer';

export default combineReducers({
  auth,
  product,
});
