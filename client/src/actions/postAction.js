import axios from 'axios';
import {CREATE_JOB, GET_JOBS, JOB_LOADING, GET_JOB} from './types';


export const createJobpost = (postJobData, history)=> dispatch =>{
    axios.post('/jobs/create_jobpost',postJobData)
    .then(res => dispatch({
        type:CREATE_JOB,
        payload:res.data
    })).then(res=> history.push('/company_dashboard'))
}

export const getJobpost = ()=> dispatch =>{
    dispatch(setPostLoading());
    axios.get('/jobs/get_jobpost').then(res => dispatch({
        type:GET_JOBS,
        payload:res.data
    }))
}

export const getsingleJob = (company_id)=> dispatch =>{
    dispatch(setPostLoading());
    axios.get('/jobs/get_jobpost/'+company_id).then(res => dispatch({
        type:GET_JOB,
        payload:res.data
    }))
}


export const setPostLoading = () => {
    return {
      type: JOB_LOADING
    };
};

