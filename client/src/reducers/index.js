import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import getJobReducer from './getjobReducer';
import profileReducer from './profileReducer'

export default combineReducers({
  auth: authReducer,
  jobpost: postReducer,
  getapply_job: getJobReducer,
  profile: profileReducer
});
