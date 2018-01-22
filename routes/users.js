var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/User');

/* GET users listing. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  var userId = req.session.passport.user;
  User.findById(userId, function (err, user) {
    if (err) {
      console.log(err);
    }
    console.log(user);
    var API_URL = 'https://api.github.com';
    var options = {
      url: API_URL + '/users/' + user.githubUsername + '/repos',
      headers: {
        'User-Agent': 'hawksaggs'
      }
    }
    console.log(options);
    request(options, function (error, response, body) {
      if (error) {
        console.log(error);
      }
      var body = JSON.parse(body);
      console.log(body);
      return res.render('users', { isLogin: true, items: body });
    });
  });
});

router.get('/profile', function (req, res, next) {
  return res.render('profile');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/auth/login');
}

module.exports = router;
