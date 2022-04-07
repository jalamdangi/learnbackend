const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/learn",
{useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true})
.then( () => console.log("connection succesfull.."))
.catch( (err)=>console.log(err));


