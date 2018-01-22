var passport = require('passport');
var User = require('../models/User');


module.exports = function () {

    passport.serializeUser(function (user, done) {
        return done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            if (err) {
                return done(err);
            }
            console.log(user);
            return done(null, user);
        });
    });

};