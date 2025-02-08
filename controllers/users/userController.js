const User = require("../../model/User/User");
const bcrypt = require('bcryptjs');

//Register 
userRegisterCtrl = async(req, res) => {
    const {firstname, lastname, email,password} = req.body;

    console.log(req.body);
    try {
        //check if user exists
        const userFound = await User.findOne({email});
        if(userFound){
          return res.json({
                msg: "User already exists"
            });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        //create a user
        const user = await User.create({
            firstname,
            lastname,
             email,
             password : hash
        })
       res.json({
           status: "success",
           data: user
       })
    } catch (error) {
       res.json(error.message)
    }
}
// Login
userLoginCtrl = async(req, res) => {
    const {email, password} = req.body;
    try {
        // check if user exists
        const userFound = await User.findOne({email});

        if(!userFound){
            return res.json({
                msg: "Invalid login credentials"
            })
        }

        // verify password
        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch){
            return res.json({
                msg: "Invalid login credentials",
            })
        }

       res.json({
           status: "success",
           data: userFound
       })
    } catch (error) {
       res.json(error.message)
    }
}
//Profile
userProfileCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Profile Route"
       })
    } catch (error) {
       res.json(error.message)
    }
}

// Get Users
getUsersCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Get all Users Route"
       })
    } catch (error) {
       res.json(error.message)
    }
}

userDeleteCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Delete Route"
       })
    } catch (error) {
       res.json(error.message)
    }
}

userUpdateCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Edit Route"
       })
    } catch (error) {
       res.json(error.message)
    }
}

module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    userProfileCtrl,
    getUsersCtrl,
    userDeleteCtrl,
    userUpdateCtrl
}