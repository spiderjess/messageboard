const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Post = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    comments: [String]
});

module.exports = mongoose.model('Post', Post)