import axios from 'axios';
import {CREATE_JOB, GET_JOBS, JOB_LOADING, GET_JOB, APPLY_JOB, GET_APPLY_JOB_STUDENT} from './types';

//company create new job
export const createJobpost = (postJobData, history)=> dispatch =>{
    axios.post('/jobs/create_jobpost',postJobData)
    .then(res => dispatch({
        type:CREATE_JOB,
        payload:res.data
    })).then(res=> history.push('/company_dashboard'))
}

//getting all jobs of different companies
export const getJobpost = ()=> dispatch =>{
    dispatch(setPostLoading());
    axios.get('/jobs/get_jobpost').then(res => dispatch({
        type:GET_JOBS,
        payload:res.data
    }))
}

//getting job of particular copany against id
export const getsingleJob = (company_id)=> dispatch =>{
    dispatch(setPostLoading());
    axios.get('/jobs/get_jobpost/'+company_id).then(res => dispatch({
        type:GET_JOB,
        payload:res.data
    }))
}

//student apply for job of any company's post
export const applyJobpost = (applyJobData, history) => dispatch =>{
    axios.post('/jobs/apply_jobpost', applyJobData).then(res => dispatch({
        type:APPLY_JOB,
        payload:res.data
    }))
}

export const getApplyjobStudent = (student_id) => dispatch =>{
    dispatch(setPostLoading());
    axios.get('/jobs/apply_jobpost/'+student_id).then(res => dispatch({
        type:GET_APPLY_JOB_STUDENT,
        payload:res.data
    }))
}

export const setPostLoading = () => {
    return {
      type: JOB_LOADING
    };
};

