const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    URL:{
        type:String,
    },
    DATE:{
        type:Date,
        default:Date.now(),
    },
    LIKES:[
        {
            _id:{
                type:mongoose.Schema.Types.ObjectId,
            },
            NAME:{
                type:String,
            },
            U_id:{
                type:mongoose.Schema.Types.ObjectId,
            },
            DATE:{
                type:Date,
                default:Date.now(),
            }
        }
    ],
    COMMENTS:[
        {
            _id:mongoose.Schema.Types.ObjectId,
            NAME:{
                type:String,
            },
            U_id:{
                type:mongoose.Schema.Types.ObjectId,
            },
            DATE:{
                type:Date,
                default:Date.now(),
            },
            TEXT:{
                type:String,

            },
            LIKES:{
                type:Number,
                default:0,
            },
            REPLIES:[
                {
                    _id:mongoose.Schema.Types.ObjectId,
                    NAME:{
                        type:String,
                    },
                    U_id:{
                        type:mongoose.Schema.Types.ObjectId,
                    },
                    DATE:{
                        type:Date,
                        default:Date.now(),
                    },
                    TEXT:{
                        type:String,
        
                    },
        
                }
            ]
        }
    ]

});


module.exports = mongoose.model('Post',PostSchema);