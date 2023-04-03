import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/auth.js";

export const signup = (req, res, next) => {
    let { name, email, password, password_confirmation } = req.body;

    User.findOne({email: email})
    .then(user => {
        if(user) {
            return res.status(422).json({ errors: [{ user: 'email already exists' }] });
        } else {
            const user = new User({
                name: name,
                email: email,
                password: password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) throw err;
                    user.password = hash;
                    user.save()
                        .then(response => {
                            res.status(200).json({
                                success: true,
                                result: response
                            })
                        }).catch(err => {
                            res.status(500).json({
                                errors: [{error: err}]
                            });
                        });
                });
            })
        }
    }).catch(err => {
        res.status(500).json({
            errors: [{ error: 'Something went wrong'}]
        })
    })
}

export const signin = (req, res) => {
    let { email, password } = req.body;

    User.findOne({ email: email }).then(user => {
        if(!user) {
            return res.status(404).json({
                errors: [{ user: "not found" }]
            });
        } else {
            bcrypt.compare(password, user.password).then(isMatch => {
                if(!isMatch) {
                    return res.status(400).json({
                        errors: [{ password: "incorrect" }]
                    });
                }
            })
            
            let access_token = createJWT(user.email, user._id, 3600);
            jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if(err) {
                    res.status(500).json({ erros: err });
                }
                if(decoded) {
                    return res.status(200).json({
                        success: true,
                        token: access_token,
                        message: user
                    });
                }
            }).catch(err => {
                res.status(500).json({ erros: err });
            });
        }
    }).catch(err => {
        res.status(500).json({ erros: err });
    });
}