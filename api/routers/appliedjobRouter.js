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
    const new_applyJob = new AppliedJob({
        job_id:req.body.job_id,
        student_id:req.body.student_id,
        company_id:req.body.company_id,
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

router.get('/apply_jobpost/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('getting students of =====  ', id)
    var query ={
        "student_id":id
    }
    AppliedJob.find (query) 
    .populate('job_id')
    .exec()
    .then(doc => {
        var response = {
            count:doc.length,
            datas: doc.map(item=>{
                return{
                    name:item.name,
                    email:item.email,
                    experience:item.experience,
                    company:item.job_id.name,
                    apply_for:item.job_id.job_title
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

router.get('/get_applications/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('getting =====', id)
    var query ={
        "company_id":id
    }
    AppliedJob.find (query) 
    .select('_id job_id student_id company_id name email contact qualification experience file_cv skills')
    .populate('job_id','job_title')
    .exec()
    .then(doc => {
        
        // console.log('doc', doc)
        var final_resp = {}
        var response = {}
        final_resp["count"] = doc.length;
        var my_array = []
        var count_dict = {}
        doc.map(obj => {
            if(!response.hasOwnProperty(obj.job_id._id)) {	
                response[obj.job_id._id] = []
            } 
            response[obj.job_id._id].push(obj.job_id.job_title)
        })

        my_array.push(response);
        var count_array = []
        Object.keys(response).map(items=>{
            my_array.map(item=>{
                count_dict[items] = item[items].length
            })
        })
        Object.keys(response).map(items=>{
            console.log('items', items)
            my_array.map(item=>{
                console.log('item', item)
                count_dict["name"] = item[items]
            })
        })


        console.log('count dict', count_dict)



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


router.get('/get_applications_detail/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('gettng ====', id)
    var query ={
        "job_id":id
    }
    AppliedJob.find (query) 
    .select('_id job_id student_id company_id name email contact qualification experience file_cv skills')
    .exec()
    .then(doc => {
        const response = {
            counts : doc.length,
            data:doc.map(item=>{
                return{
                    _id:item._id,
                    name:item.name,
                    email:item.email,
                    qualification:item.qualification,
                    experience:item.experience,
                    skills:item.skills,
                    file_cv:item.file_cv
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