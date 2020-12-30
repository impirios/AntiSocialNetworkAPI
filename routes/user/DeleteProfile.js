const express = require('express');
const Grid  = require('gridfs');
const Mongoose = require('mongoose');
const User = require('../../models/User');
const router = express.Router();

let conn = Mongoose.connection;
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new Mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "Profile"
  });
});


router.delete("/:id", (req, res) => {
  User.findOne({_id:req.params.id},(err,user)=>{
    if(err || user === null)
    {   
        return res.status(404).send({err:"User does not exist"}).end();
    }
    console.log("started");
    gfs.delete(new Mongoose.Types.ObjectId(user.PictureID),(err,data)=>{
      if(err)
      {
        return res.status(404).json({err:err.message});
      }
    user.updateOne(
        {Picture:'/images/default.png'},
        {safe: true, upsert: true, new : true},
        (err,model)=>{
            if(err || model===null)
            {
                res.status(404);
                return res.send({err:err.message});
            }
            return res.status(200).send({Profileupdated:true});

        }
    );

    });
});

   


});
module.exports = router;