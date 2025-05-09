const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
     },

    title: {
        type: String,
        required: true
     },

},
{
timestamps: true,
})

module.exports = mongoose.model("Category", categorySchema)