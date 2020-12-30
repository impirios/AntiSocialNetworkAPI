var express = require('express');
const User = require('../../models/User');
var router = express.Router();

router.get('/:id',function(req,res)
{
    User.findOne({_id:req.params.id},{Password:0,Email:0,Created:0,Age:0},(err,user)=>{
        if(err||user===null)
        {
            console.log("Cannot get user");
            return res.status(404).send({error:"user not found"}).end();
            
        }
        return res.status(200).send(user).end();

    });
});

module.exports = router;
