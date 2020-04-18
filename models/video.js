const mongoose = require('mongoose');

let videoSchema = new mongoose.Schema({
    absPath: String,
    title: String,
    type: String,
    thumbnail: String,
    category: String
});

module.exports = mongoose.model('Video', videoSchema);