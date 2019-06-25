import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {SET_CURRENT_USER} from './types';


//create user
export const createUser = (userData, history)=> dispatch =>{
    axios.post('/user/signup',userData)
    .then(res => history.push('/login'));
}

//login user
export const loginUser = (userData)=> dispatch =>{
    axios.post('/user/login',userData)
    .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token)
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    })
}

export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};