import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/auth.js";

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const signup = (req, res, next) => {
    console.log(req.body);
    let { name, email, password, password_confirmation } = req.body;
    const errors = [];

    if(!name) errors.push({ name: "required" });
    if(!email) errors.push({ email: "required" });
    if(!emailRegexp.test(email)) errors.push({ email: "invalid" });
    if(!password) errors.push({ password: "required" });
    if(!password_confirmation) errors.push({ password_confirmation: "required" });
    if(password !== password_confirmation) errors.push({ password: "mismatch" });
    if(errors.length > 0) return res.status(422).json({ errors: errors});

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
                            console.log(err);
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
    const payload = { success: false }

    if (!email) return res.status(422).json({ error: "EMAIL_NOT_PROVIDED" });
    if (!emailRegexp.test(email)) return res.status(422).json({ error: "INVALID_EMAIL" });
    if (!password) return res.status(422).json({ error: "PASSWORD_NOT_PROVIDED" });
    console.log('BEFORE USER FIND ONE')

    User.findOne({ email: email }).then(user => {
        if(!user) {
            console.log('USER NOT FOUND')
            return res.status(404).json({ error: "USER_NOT_FOUND" });
        } else {
            bcrypt.compare(password, user.password).then(isMatch => {
                if(!isMatch) {
                    console.log('INVALID PASSWORD')
                    return res.status(400).json({ error: "INCORRECT_PASSWORD" });
                }
            });
            
            let access_token = createJWT(user.email, user._id, 3600);
            console.log('BEFORE JWT')
            jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if(err) {
                    console.log('JWT ERROR')
                    return res.status(500).json({ error: err });
                }
                if(decoded) {
                    console.log('SUCCESFULL RETURN USER')
                    payload.succes = true;
                    payload.message = user;
                    payload.token = access_token;
                }
            })
            // .catch(err => {
            //     console.log('JWT CATCH')
            //     return res.status(500).json({ error: err });
            // });
        }
        return res.status(200).json( payload );
    }).catch(err => {
        console.log('USER FIND ONE CATCH')
        return res.status(500).json({ error: err });
    });
}