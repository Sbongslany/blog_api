
//Register 
userRegisterCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "user registered"
       })
    } catch (error) {
       res.json(error.message)
    }
}
// Login
userLoginCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Login"
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