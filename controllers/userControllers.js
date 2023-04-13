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

exports.loginUser = async (req,res) =>{
  try {
    let email = req.body.email;
    let password = req.body.password;
    const userCredentials = await User.findOne({email:email})
    if (userCredentials) {
      const authenticated = bycrypt.compareSync(password,userCredentials.password)
      if (authenticated) {
        jwt.sign({email:email,id:userCredentials._id},"UserToken",{expiresIn:"1d"},(err,token)=>{
          if (err) {
            res.status(500).json({
              "status":false,
              message:err.message
            })
          }
          else{
            res.json({
              "status":"success",
             "data":userCredentials,
              "token":token
            })
          }
        })
      }
      else{
        res.json({"status":"failed","data":"invalid password"})
    }
    }else{
      res.json({"status":"failed","data":"invalid email"})
  }
  } catch (error) {
    res.status(500).json({
      "status":false,
      message:error.message
    })
  }
}