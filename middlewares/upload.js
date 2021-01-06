const mongoose = require('mongoose');
var grid = require('gridfs-stream');
var path = require('path');
var fs = require('fs');


var connection = mongoose.connection;
var gridfs;
connection.once('open',()=>{
    console.log("Connection open");
    gridfs = grid(connection.db,mongoose.mongo);
    gridfs.collection('images');

});
function upload(req,res) {
    console.log('entered');
    console.log(req.file.path);
    if(connection!=="undefined")
    {
        console.log(connection.readyState.toString());
        var filesrc = 'static/uploads/c'+req.file.filename;
        grid.mongo = mongoose.mongo;
        console.log(filesrc);
//        connection.once("open",()=>{
//            console.log("Connection open");
//            var gridfs = grid(connection.db);
//            gridfs.collection('images');
            if(gridfs){
                var streamwrite = gridfs.createWriteStream({
                    _id:req.file.id,
                    filename:req.file.filename,
                    root:'Profile',
                    content_type:'image/png'
                });
                fs.createReadStream(filesrc).pipe(streamwrite);
                streamwrite.on("close",(file)=>{
                    console.log("Done");
                    try {
                        fs.unlinkSync('static/uploads/'+req.file.filename);
                        //file removed
                      } catch(err) {
                        console.error(err);
                      }
                    try {
                        fs.unlinkSync('static/uploads/c'+req.file.filename);
                        //file removed
                    } catch(err) {
                        console.error(err);
                    }
                    
                });
            }
            else{
                return res.status(404).send('cannot be Uploaded').end();
            }
//        });
    }
    else{
        return res.status(404).send('cannot be Uploaded').end();
    }
    
}


module.exports = upload;