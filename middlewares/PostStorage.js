require('dotenv').config();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const Mongoose = require('mongoose');
const Mongouri = process.env.MONGO_URL;
let conn = Mongoose.connection;
let gfs;
conn.once('open',()=>{
    gfs = Grid(conn.db,Mongoose.mongo);
    gfs.collection('Posts');
});


//defining the middleware for multer so this will be called everytiime a new image is uploaded using multer 
let storage = new GridFsStorage({
    url:Mongouri,
    file:(req,file)=>{
        return new Promise(
            (resolve,reject)=>{
                const fileInfo = {
                    filename:Mongoose.Types.ObjectId()+file.originalname,
                    bucketName:"Posts"
                };
                resolve(fileInfo);
            }
        );
    }

});


//initialising multer with the middleware 
const upload = multer({storage});

module.exports = upload;