const Connection = require("../../models/Connection");
const express = require('express');
const router = express.Router();

router.get('/:id',(req,res)=>{
    Connection.find({UserID:req.params.id},(err,users)=>{
        if(err || users===null)
        {
            res.status(404).send("cannot get following").end();
        }
        else
        {
            res.status(200).send({totalfollowing:users.length,following:users}).end();
        }
    });
});

module.exports = router;