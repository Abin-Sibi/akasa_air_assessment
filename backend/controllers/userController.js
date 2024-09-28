const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const registerUser = async (req,res)=>{
   console.log(req.body)
   const { name,email, password } = req.body;
   const hashedPassword = await bcrypt.hash(password,10);
   const newUser = new User({name,email,password:hashedPassword});
   await newUser.save();
   res.status(200).json({message:"Registered"});  
}

const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    const user =  await User.findOne({email});
    if(!user || !(bcrypt.compare(password,user.password))){
        res.status(401).json({message:"Not found the user"})
    }
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'3h'});
    res.status(200).json({token,user,message:'successfull'})
}

module.exports = {registerUser,loginUser}