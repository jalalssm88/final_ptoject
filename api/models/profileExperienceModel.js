const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileExperienceSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId, ref:'user'
    },
    job_name:{
        type:String
    },
    company_name:{
        type:String
    },
    country_name:{
        type:String
    },
    city_name:{
        type:String
    },
    from_date:{
        type:String
    },
    to_date:{
        type:String
    }
});

module.exports = mongoose.model('profile_experience', ProfileExperienceSchema);