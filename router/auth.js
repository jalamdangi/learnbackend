const express = require("express");
const router = express.Router();

require('../db/conn');
const Users = require('../models/userSchema');

router.get("/", (req,res) =>{
    res.send("hello form the server");
})

// Register Api
router.post("/register", async (req,res) =>{
    const{name, email, phone, password, cpassword} = req.body;
    if(!name || !email || !phone || !password || !cpassword){
        return res.status(422).json({error:"All fields are required"}); 
    }
    try{
        const userExist = await Users.findOne({email:email})
        if(userExist){
            return res.status(422).json({error:"Email already exist"}); 
        }else if(password != cpassword){
            return res.status(422).json({error:"Password are not matching"}); 
        }
        else{   
            const User = new Users({name, email, phone, password, cpassword})
            // password hashing
            await User.save();
            res.status(201).json({message:"user register successfully"});
            console.log('success');
        }
    }catch(err){
        console.log(err);
    }
})


// Login Api
router.post("/login", async(req,res) =>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Please fill both fields"});
        }
        const emailExist = await Users.findOne({email:email});
        if(emailExist){
            res.json({message:"login successfull"})
            //console.log(emailExist);
        }
        else{res.json({message:"email not found"})}
    }catch(err){
        console.log(err);
    }
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
