const User = require("../models/userModel");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// User Registration
exports.createUsers = async (req, res) => {
    try {
      const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password    
      });
      user.save();
  
      res.status(201).json({
          success:true,
          user
      })
    } catch (error) {
      res.status(400).json({
          success:false,
          message:error.message
      })
    }
  };

// view allUsers
exports.getAllUsers = async(req,res)=>{

    try {
        const users = await User.find()

        res.send(users).status(200)
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}

// user Login 

exports.loginUser = async(req,res)=>{
    try {
      const {email,password} = req.body;
      const userCredential = await User.findOne({email:email})
      if (userCredential) {
        const authenticated = bycrypt.compareSync(password,userCredential.password);
        if (authenticated) {
          jwt.sign({email,id:userCredential._id},"UserToken",{},(err,token)=>{
            if (err) {
              res.status(500).json({
                success:false,
                message:err.message
              })
            }
            else{
              res.status(200).json({
                status:"success",
                "data":userCredential,
                "token":token
  
              })
            }
          })
        }
      }
      
    } catch (error) {
      
    }
  }