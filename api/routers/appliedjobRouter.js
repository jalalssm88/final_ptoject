const express = require('express');
const router = express.Router();
var multer = require('multer')

//handling file upload using multer
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    }
});


const AppliedJob = require('../models/appliedjobModel');

router.post('/apply_jobpost', upload.single('file_cv'), (req, res, next)=>{
    console.log('req body', req.body)
    console.log('req file', req.file.path)
    const new_applyJob = new AppliedJob({
        job_id:req.body.job_id,
        student_id:req.body.student_id,
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        qualification: req.body.qualification,
        experience: req.body.experience,
        file_cv:req.file.path,
        skills:req.body.skills
    })
    new_applyJob.save()
    .then(posts => {
        res.status(201).json({
            status:"success",
            message: 'product successfully save to database',
        });
    })
    .catch(err => {
       res.status(500).json({
           error:err
       })
    })
});

router.get('/get_applied_job', (req, res, next)=>{
    AppliedJob.find()
    .select('_id job_id student_id name email contact qualification experience file_cv skills')
    .exec()
    .then(docs=>{
        const response = {
            count:docs.length,
            data:docs.map(doc =>{
                return {
                    _id:doc._id,
                    job_id:doc.job_id,
                    student_id:doc.student_id,
                    name:doc.name,
                    email:doc.email,
                    contact:doc.contact,
                    qualification:doc.qualification,
                    experience:doc.experience,
                    file_cv:doc.file_cv,
                    skills:doc.skills,
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

router.get('/apply_jobpost/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('id=======', id)
    var query ={
        "student_id":id
    }
    AppliedJob.find (query) 
    .select('_id job_id student_id name email contact qualification experience file_cv skills')
    .populate('job_title', 'name')
    // // .populate('jobpost')
    .exec()
    .then(doc => {
        console.log('doc', doc)
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