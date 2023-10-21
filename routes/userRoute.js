const express = require('express')
const UserModel = require('../models/userModel')
const userRouter = express.Router()
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')

userRouter.get("/",(req,res)=>{
    res.send("welcome to cookbook app")
})

// Register The user

userRouter.post("/register",async(req,res)=>{
  const {name,email,password,gender,city} = req.body

    try {

         // Check if the email already exists in the database
          const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use" });
    }

        bcrypt.hash(password,5,async(err,hash)=>{
            const user = new UserModel({name,email,gender,city,password:hash})
            await user.save()
            res.status(200).send({msg:"new user has been registered"})
        })

        
    } catch (error) {
        res.status(400).send({msg:error.message})
    }

})

// Login the user

userRouter.post("/login",async(req,res)=>{
      const {email,password} = req.body
      try {
         const user = await UserModel.findOne({email})

        //  if(!user){
        //     res.status(400).send({"msg":"user not registered"})
        //  }
        // else{
        //     res.status(200).send({"msg":"Login Successfully new user"})
        //  }

        if(user){
            bcrypt.compare(password,user.password,(error,result)=>{
                if(result){
                     const Token = jwt.sign({authorID:user._id},'fazu')
                     res.status(200).send({msg:"Login Successfully new user", "Token":Token})
                }else{
                    res.status(400).send({msg:"wrong cadestrial.."})
                }

            })
        }else{
            res.status(400).send({msg:"User Does not exist"})
        }

      } catch (error) {
        res.status(400).send({error:error.message})
      }
})




module.exports=userRouter;