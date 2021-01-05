const mongoose = require('mongoose');
const {default:validator} = require('validator');

const ConnectionSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    UserID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    FollowingID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    Username:{
        type:String,
        required:true
    },
    Followingname:{
        type:String,
        required:true
    },
    UserPic:{
        type:String,
        required:true
    },
    FollowingPic:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Connection',ConnectionSchema);