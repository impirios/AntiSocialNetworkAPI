const sharp = require("sharp");
const Gupload = require('./upload.js');

function compressSharp(req,res,upload)
{
    sharp('static/uploads/'+req.file.filename)
    .resize({width:400,height:400})
    .toFormat('png')
    .toFile('static/uploads/c'+req.file.filename)
    .then(()=>{
        if(upload)
        {
            Gupload(req,res);
        }
        else{
            return;
        }

        
    }).catch(err=>{
        console.log(err);
        return res.status(404).send(err).end();
    });
}

module.exports = compressSharp;