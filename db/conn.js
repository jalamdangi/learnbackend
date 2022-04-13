const mongoose = require("mongoose");
const db = process.env.DATABASE;

mongoose.connect(db,
{useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true})
.then( () => console.log("connection succesfull.."))
.catch( (err)=>console.log(err));


