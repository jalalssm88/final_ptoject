const express = require('express');
const router = express.Router();

const ProfileSummary = require('../models/profileSummaryModal');
const ProfileExperience = require('../models/profileExperienceModel');
const ProfileEducation = require('../models/profileEducationModel');

//profile summary
router.post('/add_summary', (req, res, next)=>{
    console.log('req body in user profile', req.body)
    const new_summary = new ProfileSummary(
        req.body
    )
    new_summary.save()
    .then(profile => {
        res.status(201).json({
            message: 'profile created',
        });
    })
    .catch(err => {
       res.status(500).json({
           error:err
       })
    })
});

router.get('/get_summary/:id', (req, res, next)=>{
    const id = req.params.id;
    var query ={
        "user":id
    }
    Jobpost.find (query) 
    .select('_id user summary')
    .exec()
    .then(doc => {
        const response ={
            data:doc.map(doc=>{
                return{
                    _id:doc._id,
                    user:doc.user,
                    summary:doc.summary,
                }
            })
        }
        if(doc){
            res.status(200).json(response)
        }else{
            res.status(404).json({
                message: "no data found against this id",
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});


//profile experience
router.post('/add_experience', (req, res, next)=>{
    console.log('req body in user profile', req.body)
    const new_experience = new ProfileExperience(
        req.body
    )
    new_experience.save()
    .then(profile => {
        res.status(201).json({
            message: 'profile created',
        });
    })
    .catch(err => {
       res.status(500).json({
           error:err
       })
    })
});

router.get('/get_experience/:id', (req, res, next)=>{
    const id = req.params.id;
    var query ={
        "user":id
    }
    Jobpost.find (query) 
    .select('_id user job_name country_name city_name from_date to_date')
    .exec()
    .then(doc => {
        const response ={
            data:doc.map(doc=>{
                return{
                    _id:doc._id,
                    user:doc.user,
                    job_name:doc.job_name,
                    country_name:doc.country_name,
                    city_name:doc.city_name,
                    from_date:doc.from_date,
                    to_date:doc.to_date
                }
            })
        }
        if(doc){
            res.status(200).json(response)
        }else{
            res.status(404).json({
                message: "no data found against this id",
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});


// profile education
router.post('/add_education', (req, res, next)=>{
    const new_education = new ProfileEducation(
        req.body
    )
    new_education.save()
    .then(profile => {
        res.status(201).json({
            message: 'profile created',
        });
    })
    .catch(err => {
       res.status(500).json({
           error:err
       })
    })
});

router.get('/get_education/:id', (req, res, next)=>{
    const id = req.params.id;
    var query ={
        "user":id
    }
    Jobpost.find (query) 
    .select('_id user degree_title study_field edu_country edu_city completion_year')
    .exec()
    .then(doc => {
        const response ={
            data:doc.map(doc=>{
                return{
                    _id:doc._id,
                    user:doc.user,
                    degree_title:doc.degree_title,
                    study_field:doc.study_field,
                    edu_country:doc.edu_country,
                    edu_city:doc.edu_city,
                    completion_year: doc.completion_year,
                }
            })
        }
        if(doc){
            res.status(200).json(response)
        }else{
            res.status(404).json({
                message: "no data found against this id",
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;