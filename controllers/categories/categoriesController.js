const Category = require("../../model/Category/Category");
const {appErr, AppError} = require("../../utils/appErr");


//create category
const createCategoryCtrl = async(req, res, next) => {
    const { title } = req.body;
    try {
        const category = await Category.create({title, user: req.userAuth})
       res.json({
           status: "success",
           data: category
       })
    } catch (error) {
        next(appErr(error.message));
    }
}
//Get all categories
const getCategoriesCtrl = async(req, res, next) => {
    try {
        const categories = await Category.find()
       res.json({
           status: "success",
           data: categories
       }) 
    } catch (error) {
        next(appErr(error.message));
    }
}

//Get category
const getCategoryByIdCtrl = async(req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)

        res.json({
            status: "success",
            data: category
        })
    } catch (error) {
        next(appErr(error.message));
    }
}
deleteCategoryCtrl = async(req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
       res.json({
           status: "success",
           data: "category deleted successfully"
       })
    } catch (error) {
        next(appErr(error.message));
    }
}

updateCategoryCtrl = async(req, res, next) => {
    const {title} = req.body;
    try {
        const category = await Category.findByIdAndUpdate(req.params.id,
            {title},
            {new: true, runValidators: true}
            )
        res.json({
           status: "success",
           data: category
       })
    } catch (error) {
        next(appErr(error.message));
    }
}

module.exports = {
    createCategoryCtrl,
    getCategoryByIdCtrl,
    deleteCategoryCtrl,
    updateCategoryCtrl,
    getCategoriesCtrl
}