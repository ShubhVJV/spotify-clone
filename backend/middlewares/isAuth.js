import jwt, { decode } from 'jsonwebtoken';
import { User } from '../models/user.js';

export const isAuth=async(req,res,next)=>{
    try {


        const token = req.cookies.token
        if(!token)
            return res.status(400).json({message:"Please login"});

        const decodedData= jwt.verify(token,process.env.Jwt_secret);
        if(!decodedData)
            return res.status(403).json({message:"token expired"});

        req.user=await User.findById(decodedData.id);
        next();
        
    } catch (error) {
        res.status(500).json({message:"Please login"});

        
        
    }
};
