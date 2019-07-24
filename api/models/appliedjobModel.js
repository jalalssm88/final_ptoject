const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppliedjobSchema = new Schema({
    job_id:{
        type:mongoose.Types.ObjectId, ref:'jobpost'
    },
    student_id:{
        type:mongoose.Types.ObjectId, ref:'user'
    },
    company_id:{
        type:mongoose.Types.ObjectId, ref:'user'
    },
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    contact:{
        type:String,
    },
    qualification:{
        type:String
    },
    experience:{
        type:String
    },
    file_cv:{
        type:String
    },
    skills:{
        type:String
    },
    status:{
        type:String,
        default:'pending'
    }
});

module.exports = mongoose.model('appliedjob', AppliedjobSchema);