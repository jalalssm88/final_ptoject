import isEmpty from '../validation/is-empty';

import { ADD_SUMMARY, GET_SUMMARY, ADD_EXPERIENCE, GET_EXPERIENCE,
    ADD_EDUCATION, GET_EDUCATION, PROFILE_LOADING} from '../actions/types';

const initialState = {
  summary: [],
  experience:[],
  education:[],
  loading: false
};

export default function(state = initialState, action){
  switch(action.type){
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_SUMMARY:
            return{
                ...state,
                // summary:[action.payload, ...state.summary]
                summary:action.payload
            }
        case GET_SUMMARY:
            return{
                ...state,
                summary:action.payload,
                // loading:false
            }

        case ADD_EXPERIENCE:
            return{
                ...state,
                experience:[action.payload, ...state.experience]
            }
        case GET_EXPERIENCE:
            return{
                ...state,
                experience:action.payload,
                // loading:false
            }
        case ADD_EDUCATION:
            return{
                ...state,
                education:[action.payload, ...state.education]
            }
        case GET_EDUCATION:
            return{
                ...state,
                education:action.payload,
                // loading:false
            }
       
        default:
            return{
                ...state
            }
  }
}
