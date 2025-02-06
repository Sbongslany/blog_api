
createCategoryCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "category created"
       })
    } catch (error) {
       res.json(error.message)
    }
}

getCategoryByIdCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "category Route"
       }) 
    } catch (error) {
       res.json(error.message)
    }
}

deleteCategoryCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "category delete Route"
       })
    } catch (error) {
       res.json(error.message)
    }
}

updateCategoryCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "category Update Route"
       })
    } catch (error) {
       res.json(error.message) 
    }
}

module.exports = {
    createCategoryCtrl,
    getCategoryByIdCtrl,
    deleteCategoryCtrl,
    updateCategoryCtrl
}