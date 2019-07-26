const express = require('express');
const router = express.Router();

const ProfileSummary = require('../models/profileSummaryModal');
const ProfileExperience = require('../models/profileExperienceModel');
const ProfileEducation = require('../models/profileEducationModel');

//profile summary
router.post('/add_summary', (req, res, next)=>{
    const new_summary = new ProfileSummary(
        req.body
    )
    new_summary.save()
    .then(profile => {
        var my_arr= []
        my_arr.push(profile)
        res.status(201).json({
           data:my_arr
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
    ProfileSummary.find (query) 
    .select('_id user summary')
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({data:doc})
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
    const new_experience = new ProfileExperience(
        req.body
    )
    new_experience.save()
    .then(profile => {
       
        res.status(201).json(profile);
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
    ProfileExperience.find (query) 
    .select('_id user job_name company_name country_name city_name from_date to_date')
    .exec()
    .then(doc => {
        
        if(doc){
            res.status(200).json(doc)
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
        res.status(201).json(profile);
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
    ProfileEducation.find (query) 
    .select('_id user degree_title study_field edu_country edu_city completion_year institude')
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json(doc)
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