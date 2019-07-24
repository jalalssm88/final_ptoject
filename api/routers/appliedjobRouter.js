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
const RejectedJob = require('../models/rejectedjobModel');
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
        
        final_response = {}
        var response = {}
        var my_array = []
        var count_dict = []
        doc.map(obj => {
            if(!response.hasOwnProperty(obj.job_id._id)) {	
                response[obj.job_id._id] = []
            } 
            response[obj.job_id._id].push(obj.job_id.job_title)
        })

        my_array.push(response);
        Object.keys(response).map(items=>{
            my_array.map(item=>{
                // if(!count_dict.hasOwnProperty(item[items])){
                //     count_dict[items] = []
                // }
                // count_dict[items].push({"count":item[items].length, "name":item[items][0]})
                // count_dict["name"] = item[items][0]
                // count_dict["id"] = items
                // count_dict["count"]=item[items].length
                count_dict.push({"count":item[items].length, "name":item[items][0], "id":items})
            })
        })

        final_response["counts"] = doc.length;
        final_response["data"] = count_dict;
        console.log('final_response', final_response)
       

        if(doc){
            res.status(200).json(final_response)
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
    .select('_id job_id student_id company_id name email contact qualification experience file_cv skills status')
    .exec()
    .then(doc => {
        const response = {
            counts : doc.length,
            data:doc.map(item=>{
                return{
                    _id:item._id,
                    student_id:item.student_id,
                    name:item.name,
                    email:item.email,
                    qualification:item.qualification,
                    experience:item.experience,
                    skills:item.skills,
                    file_cv:item.file_cv,
                    status:item.status,
                    action:item._id.btn
                }
            })
        }

        response.data['action'] = 'view.btn'
       
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

// router.post('/rejected_job', (req, res, next)=>{
//     const new_rejected_job = new RejectedJob({
//         reject_job_id:req.body.reject_job_id,
//         student_id:req.body.student_id,
//         job_id:req.body.job_id
//     })
//     new_rejected_job.save()
//     .then(job => {
//         res.status(201).json({
//             status:"success",
//             message: 'product successfully save to database',
//         });
//     })
//     .catch(err => {
//        res.status(500).json({
//            error:err
//        })
//     })
// });

router.post('/rejected_job', (req, res, next)=>{
    console.log('req body ===== ', req.body)
    var id = req.body.reject_job_id;
    var status_action = req.body.action;
    var myquery = { 'status': status_action };
    AppliedJob.findOneAndUpdate({'_id':id}, myquery, function (err, place) {
        console.log('place', place)
        res.status(200).json({
            status:"success",
            message: 'product successfully save to database',
        });
    });
});

router.get('/rejected_job/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('gettng ====', id)
    var query ={
        "student_id":id,
        "status":'rejected'
    }
    AppliedJob.find(query) 
    // .select('_id reject_job_id student_id')
    .populate('job_id','name job_title')
    .exec()
    .then(doc => {
        console.log('doc', doc)
        const response = {
            reject_counts : doc.length,
            data:doc.map(item=>{
                return{
                    _id:item._id,
                    rejectjob_id:item._id,
                    student_id:item.student_id,
                    company_name:item.job_id.name,
                    job_title:item.job_id.job_title
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

router.get('/shortlisted_job/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('gettng ====', id)
    var query ={
        "student_id":id,
        "status":'shortlisted'
    }
    AppliedJob.find(query) 
    // .select('_id reject_job_id student_id')
    .populate('job_id','name job_title')
    .exec()
    .then(doc => {
        console.log('doc', doc)
        const response = {
            shortlist_counts : doc.length,
            data:doc.map(item=>{
                return{
                    _id:item._id,
                    rejectjob_id:item._id,
                    student_id:item.student_id,
                    company_name:item.job_id.name,
                    job_title:item.job_id.job_title
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