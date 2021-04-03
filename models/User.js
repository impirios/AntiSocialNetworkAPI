const mongoose = require('mongoose');
const {default:validator} = require('validator');

const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Name:{
        type:String,
        required:[true,"Name is required"],
        minlength:[1,'Minimum length is 1']
    },
    Password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[8,"Password should be atleast 8 characters long"]
    },
    Gender:{
        type:String
    },
    Email:{
        type:String,
        required:[true,"Email is required"],
    },
    Age:{
        type:Number,
        required:[true,"Age is required"]
    },
    Picture:{
        type:String,
        default:'/images/default.png'
    },
    PictureID:{
        type:mongoose.Schema.Types.ObjectId,
        
    },
    Bio:{
        type:String,
        default:""

    },
    DOB:{
        type:Date,
        default:Date.now()
    },
    Created:{
        type:Date,
        default:Date.now()
    },
    Followers:{
        type:mongoose.Schema.Types.ObjectId,
    },
    Following:{
        type:mongoose.Schema.Types.ObjectId,
        
    }
});

userSchema.path('Email').validate(async(email)=>{
    console.log(email);
    const Ecount = await mongoose.models.User.countDocuments({Email:email});
    return !Ecount;
},"Email already exists");

userSchema.path('Name').validate(async(name)=>{
    console.log(name);
    const Ecount = await mongoose.models.User.countDocuments({Name:name});
    return !Ecount;
},"Username already exists");

userSchema.path('Password').validate(async(password)=>{
    if(password.length <8)
    {
        return false;
    }
    return true;
},"Password should be atleast 8 characters long");

userSchema.path('Age').validate(async(age)=>{
    if(age<=0)
    {
        return false;
    }
    return true;
},"Age can never be negative");

module.exports  = mongoose.model('User',userSchema);