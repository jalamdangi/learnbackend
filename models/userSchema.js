const jwt = require('jsonwebtoken');
const mongooose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})

// here we are hashing the password
usersSchema.pre('save', async function(next){
    // console.log('hi from middleware');
    if(this.isModified('password')){  
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next(); 
});

// here we are generating token
usersSchema.methods.generateAuthToken = async function(){
    try{
        const SECRET_KEY = process.env.SECRET_KEY;
        let token = jwt.sign({_id : this._id}, SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

const Users = mongooose.model('USERS', usersSchema);
module.exports = Users;
