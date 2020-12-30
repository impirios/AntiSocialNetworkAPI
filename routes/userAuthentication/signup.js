const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../../models/User');
const router = express.Router();

router.post('/',(req,res)=>{
    var body = req.body;
    var { Name, Email, Password,Age} = req.body;
    if(!Password)
    {
        res.status(404);
        res.send({error:"Password is required"});
        res.end();
    }
    let hash = bcrypt.hashSync(Password,14);
    Password = hash;
    console.log(body);
    var user = new User({
        _id:mongoose.Types.ObjectId(),
        Name:Name,
        Email: Email,
        Password:Password,
        Age:Age});
    
    user.save().then(user=>{
        console.log(user);
        res.status(200);
        res.send({usercreated:true});
        res.end();
    }).catch(err=>{
        if(err!=null){
            var errors = [];

            if(err.name === "ValidationError")
            {
                console.log(err.errors);
                for(let field in err.errors){
                    errors.push(err.errors[field].message);
                }
            }
            else{
                errors.push(err);
            }

            res.status(404);
            res.send({usercreated:false,
            errors:errors});
            res.end();
        }
    });
    

});

module.exports = router;