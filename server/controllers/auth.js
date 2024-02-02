import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/auth.js";

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const signup = (req, res, next) => {
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

            const someFunc = (arr, num) => {
                for(let i = 0; i < arr.length; i++) {
                    const curr = arr[i];
                    if(curr > num) return curr;
                }
                return num;
            }
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) throw err;
                    user.password = hash;
                    user.save()
                    .then(response => {
                            let access_token = createJWT(user.email, user._id, 3600, process.env.ACCESS_TOKEN_SECRET);
                            let refresh_token = createJWT(user.email, user._id, 3600 * 24 * 7, process.env.REFRESH_TOKEN_SECRET)

                            res.cookie('refresh_token', refresh_token, {
                                secure: false,
                                httpOnly: true,
                                credentials: 'include',
                                sameSite: 'strict',
                                maxAge: 60 * 1000,
                            });

                            res.status(200).json({
                                success: true,
                                result: response,
                                access_token: access_token
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
                    return res.status(400).json({ error: "INCORRECT_PASSWORD" });
                }
            });
            
            const access_token = createJWT(user.email, user._id, 3600 * 24 * 7, process.env.ACCESS_TOKEN_SECRET);
            const refresh_token = createJWT(user.email, user._id, 3600 * 24 * 7, process.env.REFRESH_TOKEN_SECRET)

            jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if(err) {
                    return res.status(500).json({ error: err });
                }
                if(decoded) {
                    payload.success = true;
                    payload.message = user;
                    payload.access_token = access_token;
                }
            });

            res.cookie('refresh_token', refresh_token
            , {
                secure: false,
                httpOnly: true,
                credentials: 'include',
                sameSite: 'strict',
                maxAge: 60 * 1000,
              }
            );
            
            res.currentUser = {
                name: user.name,
                avatar: user.avatar
            }
        };

        return res.status(200).json({
            authData: {
                ...payload,
                authorized: true
            },
            currentUser: res.currentUser
        });
    }).catch(err => {
        console.log('USER FIND ONE CATCH', err);
        return res.status(500).json({ error: err });
    });
}

export const checkToken = (token) => {
    if(token) {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                console.log("error in verifying -> ", err);
            } else {
                const newJwtToken = jwt.sign({ userId: decoded.userId }, secretKey, { expiresIn: '1h' });
                sessionStorage.setItem('jwtToken', newJwtToken);
                res.json({ jwtToken: newJwtToken });
            }
        })
    } else {

    }
}

export const signout = (req, res) => {
    const cookie = res.cookie("refresh_token");
    if(cookie) res.clearCookie("refresh_token");
    res.authData = {};
    res.currentUser = {};
   
    res.status(200).json({
        authData: res.authData,
        currentUser: res.currentUser
    });
}