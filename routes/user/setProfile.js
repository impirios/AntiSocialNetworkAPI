const express = require('express');
const Mongoose  = require('mongoose');
const router = express.Router();
const upload = require('../../middlewares/storage');
const Grid = require('gridfs-stream');

const User = require('../../models/User');
let conn = Mongoose.connection;
let gfs;
conn.once('open',()=>{
    gfs = Grid(conn.db,Mongoose.mongo);
    gfs.collection('Posts');
});



router.post('/:id',upload.single('profilepicture'),(req,res)=>{
    console.log(req.params);
    User.findOne({_id:req.params.id},(err,user)=>{
        if(err || user === null)
        {   
            return res.status(404).send({err:"User does not exist"}).end();
        }

        user.updateOne(
            {Picture:'/images/'+req.file.filename,
            PictureID:req.file.id},
            {safe: true, upsert: true, new : true},
            (err,model)=>{
                if(err)
                {
                    res.status(404);
                    return res.send("An error occured");
                }
                res.status(200).send({Profileupdated:true});

            }
        );
    });


});

module.exports = router;