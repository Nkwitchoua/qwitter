import jwt from "jsonwebtoken";

export const createJWT = (email, userId, duration, secretKey) => {
    const payload = {
        email,
        userId,
        duration
    };
    return jwt.sign(payload, secretKey, {
        expiresIn: duration,
    });
};

export const createJWTUserToken = (userId, secretKey) => {
    const payload = {
        userId
    };

    return jwt.sign(payload, secretKey);
}