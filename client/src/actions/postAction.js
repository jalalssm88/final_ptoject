import axios from 'axios';
import {CREATE_JOB, GET_JOBS} from './types';


export const createJobpost = (postJobData, history)=> dispatch =>{
    axios.post('/jobs/create_jobpost',postJobData)
    .then(res => dispatch({
        type:CREATE_JOB,
        payload:res.data
    }))
}

export const getJobpost = ()=> dispatch =>{
    axios.get('/jobs/get_jobpost').then(res => dispatch({
        type:GET_JOBS,
        payload:res.data
    }))
}



