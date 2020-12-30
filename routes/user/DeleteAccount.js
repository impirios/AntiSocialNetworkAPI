const express = require('express');
const User = require('../../models/User');
const router = express.Router();

router.delete('/:id',(req,res)=>{
    console.log(req.params.id);
    User.findOne({_id:req.params.id},(err,user)=>{
        if(err||user === null)
        {
            return res.status(400).send("User not found").end();
        }
        
        User.deleteOne({_id:user._id},(err)=>{
            if(err!=null)
            {
               return  res.status(400).send("User cannot be deleted").end();
            }
        return res.status(200).send("User deleted ssuccessfully").end();
        });
    });


});

module.exports = router;