const express = require("express");
const app = express();
require('./db/conn');
const Users = require('./models/userSchema');
// for using json in our application
app.use(express.json());
app.use(require('./router/auth'));



app.listen(5000, () =>{
    console.log(`server is running on port 5000`);
})