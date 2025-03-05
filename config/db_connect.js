const mongoose = require('mongoose');
require("dotenv").config();


//function to connect
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected Successfully")
    } catch (e) {
        console.log(`Database error ${e}`)
        process.exit(1);
    }
}
dbConnect()