const express = require("express");
const userRouter = require("./routes/users/UserRoutes");
const postsRouter = require("./routes/posts/postsRoutes");
const commentsRouter = require("./routes/comments/commentsRouter");
const categoriesRouter = require("./routes/categories/categoriesRouter");
const globalErrHandler = require("./middlewares/globalErrHandler");
require("dotenv").config()
require('./config/db_connect')
const app = express();


app.use(express.json()) //pass incoming payload

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
