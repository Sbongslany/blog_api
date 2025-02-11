const express = require("express");
const userRouter = require("./routes/users/UserRoutes");
const postsRouter = require("./routes/posts/postsRoutes");
const commentsRouter = require("./routes/comments/commentsRouter");
const categoriesRouter = require("./routes/categories/categoriesRouter");
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
//// ------------------------ POST  -----------------------///
app.use('/api/v1/posts/', postsRouter);
/// ---------------------------- COMMENTS -----------------------///
app.use('/api/v1/comments/', commentsRouter);
/// ---------------------------- CATEGORY -----------------------///
app.use('/api/v1/categories/', categoriesRouter);


//Error handling middleware

//Liaten to server
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`))

;
