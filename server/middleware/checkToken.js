import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const checkToken = async (req, res, next) => {
    const token = req.headers.authorization;
    const authData = {};
    
    if(token) {
        jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                console.log("error token",err);
                authData.authorized = false;
            } else {
                console.log("decoded -> ", decoded);
                authData.authorized = true;
                authData.email = decoded.email;
                
                User.findOne({ email: authData.email }).then(user => {
                    if(!user) {
                        
                    }
                    res.currentUser = {
                        name: user.name,
                        avatar: user.avatar
                    }
                }).catch(err => {
                    console.log("error user not found", err);
                    res.currentUser = {};
                })

            }
        })
    } else {
        authData.authorized = false;
    }

    res.authData = authData;
}
