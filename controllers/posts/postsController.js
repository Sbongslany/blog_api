
postsCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Post created"
       })
    } catch (error) {
       res.json(error.message)
    }
}

getAllPostsCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Post Route"
       })
    } catch (error) {
       res.json(error.message)
    }
}

getPostbyIdCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Get Posts by Id Route"
       }) 
    } catch (error) {
       res.json(error.message)
    }
}

deletePostCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "delete Posts Route"
       })
    } catch (error) {
       res.json(error.message)
    }
}

updatePostCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Update Posts Route"
       })
    } catch (error) {
       res.json(error.message)
    }
}

module.exports = {
    postsCtrl,
    getAllPostsCtrl,
    getPostbyIdCtrl,
    deletePostCtrl,
    updatePostCtrl
}