import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {CREATE_NEW_JOB, GET_JOBS} from './types';


//create user
export const createpostNewJob = (postJobData, history)=> dispatch =>{
    axios.post('/jobs/new',postJobData)
    .then(res => dispatch({
        type:CREATE_NEW_JOB,
        payload:res.data
    }))
}

//login user
// export const loginUser = (userData)=> dispatch =>{
//     axios.post('/user/login',userData)
//     .then(res => {
//         const { token } = res.data;
//         localStorage.setItem('jwtToken', token);
//         setAuthToken(token)
//         const decoded = jwt_decode(token);
//         dispatch(setCurrentUser(decoded));
//     })
// }

