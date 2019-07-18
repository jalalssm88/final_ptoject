import axios from 'axios';
import {CREATE_JOB, GET_JOBS, JOB_LOADING, GET_JOB, APPLY_JOB,
     GET_APPLY_JOB_STUDENT, GET_APPLICATION_COUNT, GET_APPLICATION_DETAIL,
     CREATE_REJECT_JOB, GET_REJECT_JOB
    } from './types';

//company create new job
export const createJobpost = (postJobData, history, user_id)=> dispatch =>{
    axios.post('/jobs/create_jobpost',postJobData)
    .then(res => dispatch({
        type:CREATE_JOB,
        payload:res.data
    })).then(res=> history.push('/posted_job_listview/'+user_id))
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
export const applyJobpost = (applyJobData, history, user) => dispatch =>{
    axios.post('/jobs/apply_jobpost', applyJobData).then(res => dispatch({
        type:APPLY_JOB,
        payload:res.data
    })).then(res=> history.push('/applied_job_list/'+user))
}

export const getApplyjobStudent = (student_id) => dispatch =>{
    dispatch(setPostLoading());
    axios.get('/jobs/apply_jobpost/'+student_id).then(res => dispatch({
        type:GET_APPLY_JOB_STUDENT,
        payload:res.data
    }))
}

export const getApplication = (job_id) => dispatch =>{
    dispatch(setPostLoading());
    axios.get('/jobs/get_applications/'+job_id).then(res => 
        dispatch({
            type:GET_APPLICATION_COUNT,
            payload:res.data
        })
    )
}

export const getApplicationDetail = (job_id) => dispatch =>{
    dispatch(setPostLoading());
    axios.get('/jobs/get_applications_detail/'+job_id).then(res => 
        dispatch({
            type:GET_APPLICATION_DETAIL,
            payload:res.data
        })
    )
}

export const createRejectJob = (rejected_data) => dispatch =>{
    dispatch(setPostLoading());
    axios.post('/jobs/rejected_job/', rejected_data).then(res => 
        dispatch({
            type:CREATE_REJECT_JOB,
            payload:res.data
        })
    )
}

export const getRejectedJob = (student_id) => dispatch =>{
    dispatch(setPostLoading());
    axios.get('/jobs/rejected_job/'+student_id).then(res => 
        dispatch({
            type:GET_REJECT_JOB,
            payload:res.data
        })
    )
}




export const setPostLoading = () => {
    return {
      type: JOB_LOADING
    };
};

