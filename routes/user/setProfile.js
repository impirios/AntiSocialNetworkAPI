const express = require('express');
const Mongoose  = require('mongoose');
const router = express.Router();
const upload = require('../../middlewares/multerStorage');
const compress = require('../../middlewares/compress.js');
const User = require('../../models/User');
let conn = Mongoose.connection;
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new Mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "Profile"
  });
});



router.post('/:id',upload.single('profilepicture'),(req,res)=>{
    console.log(req.params);
    req.file.id = new Mongoose.Types.ObjectId();
    console.log((req.file.id));
    compress(req,res,true);
    User.findOne({_id:req.params.id},(err,user)=>{
        if(err || user === null)
        {   
            return res.status(404).send({err:"User does not exist"}).end();
        }
        if (user.Picture !== '/images/default.png') {
            gfs.delete(new Mongoose.Types.ObjectId(user.PictureID),(err,data)=>{
                if(err)
                {
                  return res.status(404).json({err:err.message});
                }
            });
          
        }

        user.updateOne(
            {Picture:'/profile/'+req.file.filename,
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