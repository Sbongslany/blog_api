
createCommentCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Comment created"
       })
    } catch (error) {
       res.json(error.message)
    }
}

getCommentsCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Comment by Id Route"
       }) 
    } catch (error) {
       res.json(error.message)
    }
}

deleteCommentsCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Comment delete Route"
       })
    } catch (error) {
       res.json(error.message)
    }
}

updateCommentsCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Comment Update Route"
       })
    } catch (error) {
       res.json(error.message) 
    }
}

module.exports = {
    createCommentCtrl,
    getCommentsCtrl,
    deleteCommentsCtrl,
    updateCommentsCtrl
}