const User = require("../../model/User/User");
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateToken');
const getTokenFromToken = require('../../utils/getTokenFromHeader');
const {appErr, AppError} = require("../../utils/appErr");

//Register 
const userRegisterCtrl = async(req, res, next) => {
    const {firstname, lastname, email,password} = req.body;

    console.log(req.body);
    try {
        //check if user exists
        const userFound = await User.findOne({email});
        if(userFound){
          return next(new AppError('User already exists', 500));
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
       next(appErr(error.message));
    }
}
// Login
userLoginCtrl = async(req, res, next) =>   {
    const {email, password} = req.body;
    try {
        // check if user exists
        const userFound = await User.findOne({email});

        if(!userFound){
            return next(new AppError('Invalid login credentials', 500));
        }

        // verify password
        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch){
            return next(new AppError('Invalid login credentials', 500));
        }

       res.json({
           status: "success",
           data: {
               firstname: userFound.firstname,
               lastname: userFound.lastname,
               email: userFound.email,
               isAdmin: userFound.isAdmin,
               token: generateToken(userFound._id)
           }
       })
    } catch (error) {
        next(appErr(error.message));
    }
}
//who viewed my profile
// Get Users
const whoViewedMyProfileCtrl = async(req, res, next) => {
    try {
        //find the original user
        const user = await User.findById(req.params.id);
        //who viewd
        const userWhoViewed = await User.findById(req.userAuth);
        //check if original and viewed are found
        if(user && userWhoViewed){
            //check if user who viewed is already in viewewers array
            const isUserAlreadyViewed = user.viewers.find(
                viewer => viewer.toString() === userWhoViewed._id.toJSON()
            );
            if(isUserAlreadyViewed) {
                return next(appError('You already viewed this profile'));
            }else{
                // push the user
                user.viewers.push(userWhoViewed._id);
                //save the user
                await user.save();
                res.json({
                    status: "success",
                    data: "who have viewed this profile"
                })
            }
        }

    } catch (error) {
        res.json(error.message)
    }
}

//Profile
const userProfileCtrl = async(req, res) => {
    // console.log(req.userAuth);
    // const {id} = req.params;
    try {
        // const token = getTokenFromToken(req);
        // console.log(token);
        const user = await  User.findById(req.userAuth);
        res.json({
           status: "success",
           data: user
       })

    } catch (error) {
       res.json(error.message)
    }
}

// Get Users
const getUsersCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Get all Users Route"
       })
    } catch (error) {
       res.json(error.message)
    }
}
// delete
const userDeleteCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Delete Route"
       })
    } catch (error) {
       res.json(error.message)
    }
}
//update
const userUpdateCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Edit Route"
       })
    } catch (error) {
       res.json(error.message)
    }
}
//user profile upload
const profilePhotoUploadCtrl = async(req, res, next) => {

    try {
        // find user to be updated
        const userToUpdate = await User.findById(req.userAuth);

        // Check if user is blocked
        if(!userToUpdate){
            return next(new AppError('User not found', 403));
        }

        // check if the user is blocked
        if(userToUpdate.isBlocked){
            return next(new AppError('Action not allowed, your account is blocked', 500));
        }
        // check if the user is updating their photo
        if(req.file){
            // update profile photo
            await User.findByIdAndUpdate(
                req.userAuth,
                {
                    $set: {
                        profilePhoto: req.file.path,
                    }
                },
                {
                    new: true
                }
            );
                res.json({
                    status: "success",
                    data: "You have successfully updated your profile photo!"
                })
        }


    } catch (error) {
        next(appErr(error.message, 500));
    }
}

module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    userProfileCtrl,
    getUsersCtrl,
    userDeleteCtrl,
    userUpdateCtrl,
    profilePhotoUploadCtrl,
    whoViewedMyProfileCtrl
}