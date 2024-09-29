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
    try{

        const {email,password} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'3h'});    
        res.status(200).json({token,user,message:'successfull'})
    }catch{
        res.status(500).json({message:"Internal server error"}) 
    }
}

module.exports = {registerUser,loginUser}