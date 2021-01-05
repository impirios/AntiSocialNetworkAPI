const Connection = require("../../models/Connection");
const express = require('express');
const { Router } = require("express");
const User = require("../../models/User");
const  Mongoose  = require("mongoose");

var router = express.Router();
router.post('/',async(req,res)=>{
    const{follower,following,action} = req.body;

    try{
        switch(action){
            case 'true':
                User.findById(follower,(err,Follower)=>{
                    if(err || Follower===null)
                    {
                        return res.status(404).send(err).end();
                    }
                    User.findById(following,(err,Following)=>{
                        if(err || Following===null)
                        {
                            return res.status(404).send(err).end();   
                        }
                        var connection = new Connection({
                            _id:Mongoose.Types.ObjectId(),
                            UserID:Follower._id,
                            FollowingID:Following._id,
                            Username:Follower.Name,
                            Followingname:Following.Name,
                            UserPic:Follower.Picture,
                            FollowingPic:Following.Picture

                        });
                        connection.save().then((conn)=>{
                            console.log(conn);
                            return res.status(200).send("followed").end();


                        }).catch(err=>{
                            return res.status(404).send(err).end();
                        });


                        
                    });

                });
            break;
            case 'false':
                Connection.findOneAndDelete({UserID:Follower._id,FollowingID:Following._id},(err)=>{
                    if(err!=null)
                    {
                        return  res.status(400).send("Cannot unfollow user").end();
                    }
                return res.status(200).send("unfollowed").end();
        
                });
                
            break;
            default:
                return res.status(404).send("Task cannot be performed").end();


        }

    } catch(err){
        return  res.status(400).send("Cannot unfollow user").end();

    }


});

module.exports = router;