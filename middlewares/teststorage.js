const multer = require('multer');
const fs = require('fs');

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./static/uploads');
    },filename:(req,file,cb)=>{
        cb(null,makeid(16)+file.originalname);
    }
});

const upload = multer({storage:storage});

module.exports = upload;