import jwt from "jsonwebtoken";

export const decryptUserToken = (token) => {
    let result = "";
    jwt.verify(token, process.env.USER_TOKEN_SECRET, (err, decoded) => {
        if(err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        if(decoded) {
            result = decoded.userId;
        }
    });

    return result;
}