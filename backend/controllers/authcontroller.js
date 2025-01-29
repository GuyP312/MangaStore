import express, { response } from "express";
import { User } from "../models/usermodel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req,res) =>{
    const {username,email,password} = req.body;

    try{
        if (!username || !email || password){
            throw new Error("All fields are required");
        }
    
    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
        return res.status(400).json({message:"User already exists"});
    }

    const hashedPassword = await bcryptjs.hash(password,10); //change the password to become random letter, not readable
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
        username,
        email,
        password: hashedPassword,
        verificationToken, 
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //expired after 24 hours
    });
    
    await user.save(); // create const user first so can use .save instead of .create

    // jwt
    generateTokenAndSetCookie(res, user._id);



    }
    catch(Error){
        return res.status(400).json({message:error.message});
    }
}

export const login = async (req,res) =>{
    res.send("Login route");
}

export const logout = async (req,res) =>{
    res.send("Logout route");
}