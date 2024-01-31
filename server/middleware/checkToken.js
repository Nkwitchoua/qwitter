import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
    const token = req.headers.authorization;

    console.log("token before split", token);
    
    if(token) {
        console.log("token after split", token.split(' ')[1]);
        jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                console.log("error token",err);
                // next();
            } else {
                console.log("decoded -> ", decoded);
            }
        })
    } else {

    }
}
