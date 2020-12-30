const express = require('express');
const User = require('../../models/User');
const router = express.Router();

router.post('/:id',(req,res)=>{
    User.findOne({_id:req.params.id},(err,user)=>{
        if(err || user === null)
        {   
            return res.status(404).send({err:"User does not exist"}).end();
        }
    
        user.updateOne(
            {Bio:req.body.Bio},
            {safe: true, upsert: true, new : true},
            (err,model)=>{
                if(err)
                {
                    res.status(404);
                    return res.send("An error occured");
                }
                res.status(200).send({BioAdded:true});
    
            }
        );
    });
    
});

module.exports = router;