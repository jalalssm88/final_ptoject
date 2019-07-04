import isEmpty from '../validation/is-empty';

import { GET_APPLY_JOB_STUDENT, JOB_LOADING, GET_APPLICATION_COUNT, GET_APPLICATION_DETAIL } from '../actions/types';

const initialState = {
  apply_student_job:[],
  get_application_count:[],
  get_application_detail:[],
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
        case GET_APPLICATION_COUNT:
            return{
                ...state,
                get_application_count:action.payload,
                loading:false,
            }
        case GET_APPLICATION_DETAIL:
            return{
                ...state,
                get_application_detail:action.payload,
                loading:false,
            }

            
        default:
            return{
                ...state
            }
  }
}
