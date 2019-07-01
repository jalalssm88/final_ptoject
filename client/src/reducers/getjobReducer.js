import isEmpty from '../validation/is-empty';

import { GET_APPLY_JOB_STUDENT, JOB_LOADING } from '../actions/types';

const initialState = {
  apply_student_job:[],
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
        case GET_APPLY_JOB_STUDENT:
            return{
                ...state,
                apply_student_job:action.payload,
                loading:false,
            }
        default:
            return{
                ...state
            }
  }
}
