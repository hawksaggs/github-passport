var passport = require('passport'),
    githubStrategy = require('passport-github').Strategy;
var User = require('../models/User');
var init = require('./init');

passport.use(new githubStrategy({
    clientID: "Iv1.629ec298a33cd270",
    clientSecret: "ef40c5fa77c620a907d7555688f02d01f82d477f",
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // console.log(accessToken);
        // console.log(profile);
        User.findOne({ "userId": profile.id }, (err, user) => {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (!user) {
                var newUser = new User();
                newUser.name = profile.displayName;
                newUser.userId = profile.id;
                newUser.githubUsername = profile.username;
                newUser.save((err) => {
                    // console.log(newUser);
                    return done(err, newUser);
                });
            }
            // console.log(user);
            return done(err, user);
        });
    }
));

init();

module.exports = passport;