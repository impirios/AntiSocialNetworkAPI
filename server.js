require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const App = express();
const path = require('path');
const fs = require('fs');
App.use(express.json());

App.use(bodyparser.urlencoded({
    extended: false
 }));

App.use(require('cors')());
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, 
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, 
    useFindAndModify: false,
    useUnifiedTopology: true
};
 
mongoose.connect(process.env.MONGO_URL,options);
mongoose.connection.once("open", () => {
    console.log("DB connected.");
  });

try {
    fs.mkdirSync(path.join(__dirname, '/static/uploads/'));
} 
catch (err) {
    if (err.code !== 'EEXIST') throw err;
}
  
  

App.use("/signup",require('./routes/userAuthentication/signup.js'));
App.use('/login',require('./routes/userAuthentication/login'));
App.use('/user',require('./routes/user/getUser.js'));
App.use('/user',require('./routes/user/DeleteAccount.js'));
App.use('/profile',require('./routes/user/setProfile'));
App.use('/profile',require('./routes/user/DeleteProfile'));
App.use('/profile',require('./routes/user/getProfile'));
App.use('/update',require('./routes/user/AddBio'));
App.use('/test',require('./tests/test'));
//App.use('/follow',require('./routes/user/approveFollower'));
App.use('/followers',require('./routes/user/getFollowers'));
App.use('/following',require('./routes/user/getFollowing'));

App.listen(process.env.PORT||8081,()=>{
    console.log("Server started at "+process.env.HOST+":"+process.env.PORT);
}); 