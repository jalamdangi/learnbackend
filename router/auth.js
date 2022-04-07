const express = require("express");
const router = express.Router();

router.get("/", (req,res) =>{
    res.send("hello form the server");
})

router.post("/register", (req,res) =>{
    console.log(req.body);
    res.json({message:req.body});
    //res.send('Register successfull');
})

router.get("/about", (req,res) =>{
    res.send("hello form the about server");
})

router.get("/contact", (req,res) =>{
    res.send("hello form the contact server");
})

router.get("/signin", (req,res) =>{
    res.send("hello form the signin server");
})


module.exports = router;
