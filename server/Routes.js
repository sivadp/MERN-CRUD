// Route.js
const express = require("express");
const router = express.Router();
const UserModel = require("./models/userModel");
const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId;

router.delete("/delete", async(req, res) => {
  try {
    const userId = req.query.id;
    const userObjectId=new ObjectId(userId);
    await UserModel.deleteOne({ _id: userObjectId});
    res.status(200).json({ message: "User deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error deleting user" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await UserModel.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const newUser = new UserModel({
      name: name,
      email: email,
      password: password,
      isActive: false,
    });
    await newUser.save();
    res.status(200).json({ message: "User Registered Succesfully" });
  } catch (error) {
    console.log("error while registering new User", error);
    res.status(500).json({ message: "error while registering new User" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await UserModel.findOne({ email, password });

    if (userExists) {
      await UserModel.updateOne(
        { email, password },
        { $set: { isActive: true } }
      );
      res
        .status(200)
        .json({ message: "login successful", userDetails: userExists });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server error" });
  }
});

router.put("/logout", async (req, res) => {
  try {
    const userId = req.body.userDetails._id;
    await UserModel.updateOne({ _id: userId }, { $set: { isActive: false } });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error logging out user" });
  }
});

router.put("/update",async(req,res)=>{
  try{
    const updatedUser=req.body.userData;
    const updatedUserId=req.body.userId;
    const updatedUserObjectId=new mongoose.Types.ObjectId(updatedUserId);
    const response=await UserModel.findByIdAndUpdate(updatedUserObjectId,updatedUser,{new:true});
    if(!response){
      res.status(404).json({message:'user not found'});
    }else{
    res.status(200).json({message:'user updated with new credentials'});
    }
  }catch(e){
    console.log(e);
    res.status(500).json({message:'server error'});
  }

})

router.get("/admin", async (req, res) => {
  try {
    const usersList = await UserModel.find({});
    if (usersList.length) {
      res.status(200).json({ usersList: usersList });
    } else {
      res.status(400).json({ message: "no data found" });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
