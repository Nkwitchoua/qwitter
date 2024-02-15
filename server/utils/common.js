import jwt from "jsonwebtoken";

export const decryptUserToken = (token) => {
    jwt.verify(token, process.env.USER_TOKEN_SECRET, (err, decoded) => {
        if(err) {
            return res.status(500).json({ error: err });
        }
        if(decoded) {
            return decoded.userId;
        }
    });
}