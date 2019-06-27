const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobpostSchema = new Schema({
    company_id:{
        type:mongoose.Types.ObjectId, ref:'users'
    },
    email:{
        type:String,
    },
    name:{
        type:String,
    },
    job_title:{
        type:String,
    },
    description:{
        type:String
    },
    location:{
        type:String
    },
    address:{
        type:String
    },
    website:{
        type:String
    }
});

module.exports = mongoose.model('jobpost', JobpostSchema);