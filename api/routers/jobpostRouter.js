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

module.exports = router;