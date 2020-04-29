const mongoose = require('mongoose');

let videoSchema = new mongoose.Schema({
    absPath: String,
    title: String,
    type: String,
    thumbnail: String,
    category: String,
    currentTime: Number
});

module.exports = mongoose.model('Video', videoSchema);