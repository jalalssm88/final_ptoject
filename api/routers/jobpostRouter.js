const express = require('express');
const router = express.Router();

const Jobpost = require('../models/jobpostModel');

router.post('/create_jobpost', (req, res, next)=>{
    const new_jobpost = new Jobpost(
        req.body
    )
    new_jobpost.save()
    .then(posts => {
        res.status(201).json({
            message: 'product successfully save to database',
        });
    })
    .catch(err => {
       res.status(500).json({
           error:err
       })
    })
});

router.get('/get_jobpost', (req, res, next)=>{
    Jobpost.find()
    .select('_id company_id name job_title description location address website')
    .exec()
    .then(docs=>{
        const response = {
            count:docs.length,
            jobs:docs.map(doc =>{
                return {
                    _id:doc._id,
                    company_id:doc.company_id,
                    name:doc.name,
                    job_title:doc.job_title,
                    description:doc.description,
                    location:doc.location,
                    address:doc.address,
                    website:doc.website,
                    request:{
                        type:"GET",
                        url :"http://localhost:5000/get_job/"+doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});

router.get('/get_jobpost/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('id=======', id)
    var query ={
        "company_id":id
    }
    Jobpost.find (query) 
    .select('_id company_id name job_title description location address website')
    // // .populate('jobpost')
    .exec()
    .then(doc => {
        const response ={
            count:doc.length,
            job:doc.map(doc=>{
                return{
                    _id:doc._id,
                    company_id:doc.company_id,
                    name:doc.name,
                    job_title:doc.job_title,
                    description:doc.description,
                    location:doc.location,
                    address:doc.address,
                    website:doc.website,
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