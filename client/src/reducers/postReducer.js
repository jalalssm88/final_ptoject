import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  job: {},
  jobs: {},
};

export default function(state = initialState, action) {
  console.log('user auth payload', action.payload)
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
