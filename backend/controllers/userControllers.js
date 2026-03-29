import TryCatch from "../utils/TryCatch.js";
import bcrypt from 'bcrypt';
import { User } from "../models/user.js";
import generateToken from "../utils/generateTokens.js";



export const registerUser=TryCatch(async(req,res)=>{
    const{name,email,password}=req.body;
    console.log("BODY RECEIVED:", req.body);


    let user=await User.findOne({email})

    if(user)
        return res.status(400).json({message:"user already exists"});

    const hashPassword= await bcrypt.hash(password,10);

    user=await User.create(
        {
            name,
            email,
            password:hashPassword,
        }
    )

    generateToken(user._id,res);

    res.status(201).json({
        user,
        message:"user registered"
    });
});

export const loginUser=TryCatch(async(req,res)=>{
    const{email,password}=req.body;


    const user=await User.findOne({email})

    if(!user)
        return res.status(400).json({message:"user does not exists"});

    const comparePassword= await bcrypt.compare(password,user.password);

    if(!comparePassword)
        return res.status(400).json({message:"Wrong password"});

    generateToken(user._id,res);

    res.status(200).json({
        user,
        message:"user logged in successfully"
    });
});

export const myProfile=TryCatch(async(req,res)=>{
    const user=await User.findById(req.user._id)

    res.json(user);
});

export const logoutUser=TryCatch(async(req,res)=>{
    res.cookie("token","",{maxAge:0});
    res.json({
        message:"logged out successfully"
    })
});

export const saveToPlaylist =TryCatch(async(req,res)=>{
    const user=await User.findById(req.user._id)

    if(user.playlist.includes(req.params.id))
    {
        const index=user.playlist.indexOf(req.params.id)

        user.playlist.splice(index,1)
        await user.save();

        return res.json({message:"Removed from playlist"})
    }

    user.playlist.push(req.params.id);

    await user.save();

        return res.json({message:"Added to playlist"})
    
})