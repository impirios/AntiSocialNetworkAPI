var express = require('express');
var bcrypt = require('bcryptjs');
const User = require('../../models/User');
var router = express.Router();

router.post('/',function(req,res)
{
  var {Email,Password} = req.body;
  User.findOne({Email:Email},(err,user)=>{
      if(err||!user||!bcrypt.compareSync(Password,user.Password)){
          return res.status(401).send({error:"Incorrect email/password.",Loggedin:false});
      }
      res.status(200);
      return res.send({Loggedin:true,userID:user._id});
    }); 

});

module.exports = router;
