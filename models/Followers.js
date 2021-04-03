const mongoose = require('mongoose');

const FollowersSchema = new mongoose.Schema({
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
                default:Date.now()
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

module.exports = mongoose.model('Follower',FollowersSchema);