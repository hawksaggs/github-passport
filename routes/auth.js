var express = require('express'),
    router = express.Router(),
    passportGithub = require('../auth/github');

router.get('/login', (req, res, next) => {
    if (req.session && req.session.passport) {
        return res.redirect('/users');
    }
    return res.render('login', { title: 'Please Sign In With:' });
});

router.get('/logout', (req, res, next) => {
    // req.session.destroy();
    req.logout();
    res.redirect('/auth/login');
});

router.get('/github', passportGithub.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passportGithub.authenticate('github', { failureRedirect: '/auth/login' }), function (req, res) {
    res.redirect('/users');
});

module.exports = router;