import isEmpty from '../validation/is-empty';

import { CREATE_JOB, GET_JOBS } from '../actions/types';

const initialState = {
  jobs: [],
};

export default function(state = initialState, action){
  switch(action.type){
      case CREATE_JOB:
          return{
              ...state,
              jobs:[action.payload, ...state.jobs]
          }
      case GET_JOBS:
          return{
              ...state,
              jobs:action.payload
          }
      default:
          return{
              ...state
          }
  }
}
