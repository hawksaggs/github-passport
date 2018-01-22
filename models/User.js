var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    userId: String,
    githubUsername: String
}, {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);