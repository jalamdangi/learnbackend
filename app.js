const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
dotenv.config({path:'./config.env'});
require('./db/conn');
const Users = require('./models/userSchema');
// for using json in our application
app.use(express.json());
app.use(require('./router/auth'));
const PORT = process.env.PORT;



app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
})