
const getTokenFromHeader = require("../utils/getTokenFromHeader")
const verifyToken = require("../utils/verifyToken")
const {appErr} = require("../utils/appErr")
const  User = require("../model/User/User")

const isAdmin = async (req, res, next) => {
    // get token from header
    const token = getTokenFromHeader(req)
    // verify token
    const decodedUser = verifyToken(token)
    // save user
    req.userAuth = decodedUser.id;
    console.log(decodedUser.id);

    const user = await User.findById(decodedUser.id);
    if (user.isAdmin) {
        next();
    }else{
        return next(appErr('Access Denied, Admin only', 403));
    }
}
module.exports = isAdmin