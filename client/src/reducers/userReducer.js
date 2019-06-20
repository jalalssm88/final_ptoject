import { CREATE_USER, LOGIN_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  users: {},
  user:{}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        users: action.payload
      };
      case LOGIN_USER:
        return {
          ...state,
          user: action.payload
        };
    default:
      return state;
  }
}