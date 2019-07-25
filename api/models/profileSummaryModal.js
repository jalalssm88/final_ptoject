const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSummarySchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId, ref:'user'
    },
    summary:{
        type:String
    }
});

module.exports = mongoose.model('profile_summary', ProfileSummarySchema);