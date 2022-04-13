const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');

require('../db/conn');
const Users = require('../models/userSchema');

router.get("/", (req, res) => {
    res.send("hello form the server");
})

// Register Api
router.post("/register", async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ error: "All fields are required" });
    } else {
        try {
            const userExist = await Users.findOne({ email: email })
            if (userExist) {
                return res.status(422).json({ error: "Email already exist" });
            } else if (password != cpassword) {
                return res.status(422).json({ error: "Password are not matching" });
            }
            else {
                const User = new Users({ name, email, phone, password, cpassword })
                // password hashing
                await User.save();
                res.status(201).json({ message: "user register successfully" });
                console.log('user register success');
            }
        } catch (err) {
            console.log(err);
        }
    }
})


// Login Api
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill both fields" });
        } else {
            const emailExist = await Users.findOne({ email: email });
            if (emailExist) {
                const isMatch = await bcrypt.compare(password, emailExist.password);
                const token = await emailExist.generateAuthToken();
                console.log(token);
                res.cookie("jwtoken",token,{
                    expires: new Date(Date.now( + 600000)),
                    httpOnly: true
                });
                if (isMatch) {
                    res.json("Login successfull")
                    console.log("Login successfull")
                }
                else { res.status(400).json("wrong password") }
                //console.log(emailExist);
            } else {
                res.status(400).json({ message: "email not found" })
            }
        }
    } catch (err) {
        console.log(err);
    }
})




// About us ka page with middleware user for authentication
router.get("/about", authenticate, (req, res) => {
    console.log("hello my about");
    res.send(req.rootUser);
})

router.get("/contact", (req, res) => {
    res.send("hello form the contact server");
})

router.get("/signin", (req, res) => {
    res.send("hello form the signin server");
})


module.exports = router;
