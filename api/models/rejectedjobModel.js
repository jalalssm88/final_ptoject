const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RejectedjobSchema = new Schema({
    reject_job_id:{
        type:mongoose.Types.ObjectId, ref:'appliedjob'
    },
    student_id:{
        type:mongoose.Types.ObjectId, ref:'appliedjob'
    },
    job_id:{
        type:mongoose.Types.ObjectId, ref:'jobpost'
    }
    
});

module.exports = mongoose.model('rejectedjob', RejectedjobSchema);