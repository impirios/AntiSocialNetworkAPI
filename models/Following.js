const mongoose = require('mongoose');

const FollowingSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    pending_Following:[
        {
            _id:{
                type:mongoose.Schema.Types.ObjectId,
            },
            NAME:{
                type:String,
            },
            DATE:{
                type:Date,
                default:Date.now(),
            }
        }
    ],
    approved_Following:[
        {
            _id:{
                type:mongoose.Schema.Types.ObjectId,
            },
            NAME:{
                type:String,
            },
            DATE:{
                type:Date,
                default:Date.now(),
            }
        }
    ]

});

module.exports = mongoose.model('Following',FollowingSchema);