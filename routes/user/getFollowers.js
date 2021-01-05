const Connection = require("../../models/Connection");
const express = require('express');
const router = express.Router();

router.get('/:id',(req,res)=>{
    Connection.find({FollowingID:req.params.id},(err,users)=>{
        if(err || users===null)
        {
            res.status(404).send("cannot get followers").end();
        }
        else
        {
            res.status(200).send({totalfollowers:users.length,followers:users}).end();
        }
    });
});

module.exports = router;