import axios from 'axios';
import {ADD_SUMMARY, GET_SUMMARY, ADD_EXPERIENCE, GET_EXPERIENCE,
     ADD_EDUCATION, GET_EDUCATION, PROFILE_LOADING} from './types';


export const addSummary = (summary_data)=> dispatch =>{
    axios.post('/profile/add_summary',summary_data)
    .then(res => dispatch({
        type:ADD_SUMMARY,
        payload:res.data
    }))
}

export const getSummary = (user_id)=> dispatch =>{
    dispatch(setPostLoading());
    axios.get('/profile/get_summary/'+user_id).then(res => dispatch({
        type:GET_SUMMARY,
        payload:res.data
    }))
}

export const addExperience = (experience_data)=> dispatch =>{
    axios.post('/profile/add_experience',experience_data)
    .then(res => dispatch({
        type:ADD_EXPERIENCE,
        payload:res.data
    }))
}

export const getExperience = (user_id)=> dispatch =>{
    dispatch(setPostLoading());
    axios.get('/profile/get_profile/'+user_id).then(res => dispatch({
        type:GET_EXPERIENCE,
        payload:res.data
    }))
}

export const addEducation = (education_data)=> dispatch =>{
    axios.post('/profile/add_education',education_data)
    .then(res => dispatch({
        type:ADD_EDUCATION,
        payload:res.data
    }))
}

export const getEducation = (user_id)=> dispatch =>{
    dispatch(setPostLoading());
    axios.get('/profile/get_education/'+user_id).then(res => dispatch({
        type:GET_EDUCATION,
        payload:res.data
    }))
}

export const setPostLoading = () => {
    return {
      type: PROFILE_LOADING
    };
};

