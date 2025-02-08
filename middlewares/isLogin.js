
const getTokenFromHeader = require("../utils/getTokenFromHeader")
const verifyToken = require("../utils/verifyToken")
const appErr = require("../utils/appErr")

const isLogin = (req, res, next) => {

    // get token from header
    const token = getTokenFromHeader(req)
    // verify token
    const decodedUser = verifyToken(token, req.headers.authorization)
    // save user
    req.userAuth = decodedUser.id;

    if(!decodedUser){
        return next(appErr('Invalid/expired token, please log in again', 500));
    } else{
        next();
    }
}
module.exports = isLogin