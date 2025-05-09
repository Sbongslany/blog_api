const express = require("express");
const userRouter = require("./routes/users/UserRoutes");
const postsRouter = require("./routes/posts/postsRoutes");
const commentsRouter = require("./routes/comments/commentsRouter");
const Post = require("./model/Post/Post");
const categoriesRouter = require("./routes/categories/categoriesRouter");
const globalErrHandler = require("./middlewares/globalErrHandler");
const cors = require('cors');
require("dotenv").config()
require('./config/db_connect')
const isAdmin = require("./middlewares/isAdmin");
const {getAllPostsCtrl} = require("./controllers/posts/postsController");


const app = express();
app.use(cors()); 

app.use(express.json()) //pass incoming payload

app.get("/", async (req, res) => {
    try{
        const posts = await Post.find();
        res.json({
            status: "success",
            data: posts
        })
    }catch(err){
    res.json(err)
    }
})

//middleware
const userAuth = {
    isLogin: true,
    isAdmin: false
}

app.use((req, res, next) =>{
    if(userAuth.isLogin){
       next();
    }else{

        return res.json({
            msg : 'Invalid login credentials'
        })
    }
});

//// Routes
// app.use(isAdmin);
//// ------------------------ Users  -----------------------///
app.use('/api/v1/users/', userRouter);
//// ------------------------ Post  -----------------------///
app.use('/api/v1/posts/', postsRouter);
/// ---------------------------- Comments -----------------------///
app.use('/api/v1/comments/', commentsRouter);
/// ---------------------------- Category -----------------------///
app.use('/api/v1/categories/', categoriesRouter);

//Error handlers middleware
app.use(globalErrHandler);

app.use("*", (req,res)=>{
    res.status(404).send({
        message: `${req.originalUrl} - Route Not Found`,
    });
})

//Listen to server
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`))

;
