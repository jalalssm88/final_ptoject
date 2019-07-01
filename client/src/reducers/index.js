import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import getJobReducer from './getjobReducer';

export default combineReducers({
  auth: authReducer,
  jobpost: postReducer,
  getapply_job: getJobReducer
});
