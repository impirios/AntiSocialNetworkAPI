require('dotenv').config();
const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/teststorage');
const fs = require('fs');
const Grid = require('gridfs');
const mongo = require('mongodb');
const gridupload = require('../../middlewares/storage');
//const imageminMozjpeg = require('imagemin-mozjpeg');
//const imagemin = require('imagemin');
//const imageminJpegtran = require('imagemin-jpegtran');
//const imageminPngquant = require('imagemin-pngquant');

const compress_images = require("compress-images");


function compress(path,opath,res,req) {
  compress_images(path, opath, { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "50"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: false, command: false } },
function (error, completed, statistic) {
console.log("-------------");
if(error === null)
{

    console.log('done');}
    console.log(error);
    console.log(completed);
    console.log(statistic);
    console.log("-------------");
    
    

    

}
);
  
}

router.post('/',upload.single('profilepicture'),async (req,res)=>{
    console.log(req.file.path);
    console.log('static/uploads/'+req.file.filename);
    compress('static/uploads/'+req.file.filename,'static/uploads/c',res,req);

 
});



module.exports = router;















