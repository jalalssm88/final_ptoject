import {GET_USER} from './types';
import axios from 'axios';

//create accounts
export const createUser = (userData, history)=> dispatch =>{
    axios.post('/admin/signup',userData).then(res => dispatch({
        type:CREATE_USER,
        payload:res.data
    }))
    // .then(res => history.push('/campuses/list'));
}

export const loginUser = (userData, history)=> dispatch =>{
    axios.post('/admin/login',userData).then(res => dispatch({
        type:GET_USER,
        payload:res.data
    }))
    // .then(res => history.push('/campuses/list'));
}