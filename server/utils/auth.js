//export const createJWT = () => {}

import jwt from "jsonwebtoken";

export const createJWT = (email, userId, duration) => {
    const payload = {
        email,
        userId,
        duration
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: duration,
    });
};