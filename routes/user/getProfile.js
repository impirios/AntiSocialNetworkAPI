const express = require('express');
const router = express.Router();
const Mongoose  = require('mongoose');
const Grid = require('gridfs-stream');


let conn = Mongoose.connection;
var gfs;
conn.once('open',()=>{
    gfs = Grid(conn.db,Mongoose.mongo);
    gfs.collection('Profile');
});



router.get('/:filename',(req,res)=>{
    gfs.files.findOne({filename:req.params.filename},(err,file)=>{
        if (!file || file.length == 0) {
            return res.status(404).json({
                err: "No files exist"
            });
        }  
        if(file.contentType === 'image/jpeg'||file.contentType === "image/png"){
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }
        else{
            return res.status(404).json({
                err: "Not an image"
            });
        }
    });
});

module.exports = router;