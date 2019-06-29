import isEmpty from '../validation/is-empty';

import { CREATE_JOB, GET_JOBS, JOB_LOADING, GET_JOB} from '../actions/types';

const initialState = {
  jobs: [],
  job:[],
  loading: false
};

export default function(state = initialState, action){
    console.log('data in post reducer', action.payload)
  switch(action.type){
        case JOB_LOADING:
            return {
                ...state,
                loading: true
            };
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
        case GET_JOB:
            return{
                ...state,
                job:action.payload,
                loading:false,
            }
        default:
            return{
                ...state
            }
  }
}
