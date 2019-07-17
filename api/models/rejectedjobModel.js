const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RejectedjobSchema = new Schema({
    job_id:{
        type:mongoose.Types.ObjectId, ref:'appliedjob'
    },
    student_id:{
        type:mongoose.Types.ObjectId, ref:'appliedjob'
    },
    
});

module.exports = mongoose.model('rejectedjob', RejectedjobSchema);