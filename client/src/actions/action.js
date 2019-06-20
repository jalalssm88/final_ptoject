import {CREATE_USER, LOGIN_USER} from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


//create accounts
export const createUser = (userData, history)=> dispatch =>{
    axios.post('/user/signup',userData).then(res => dispatch({
        type:CREATE_USER,
        payload:res.data
    }))
    .then(res => history.push('/login'));
}

export const loginUser = (userData, history)=> dispatch =>{
    axios.post('/user/login',userData).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        const decoded = jwt_decode(token);

        dispatch({
            type:LOGIN_USER,
            payload:decoded
        })
    }).then(res => history.push('/dashboard'))
}