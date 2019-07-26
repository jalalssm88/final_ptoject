const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileEducationSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId, ref:'user'
    },
    degree_title:{
        type:String
    },
    study_field:{
        type:String
    },
    edu_country:{
        type:String
    },
    edu_city:{
        type:String
    },
    completion_year:{
        type:String
    },
    institude:{
        type:String
    }
});

module.exports = mongoose.model('profile_education', ProfileEducationSchema);