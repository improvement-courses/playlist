var express = require('express');
var router = express.Router();
var passport = require('passport');

var isAuth = require('../middlewares/authorize').isAuth;
var isNotAuth = require('../middlewares/authorize').isNotAuth;

router.get('/', isAuth, (req, resp, next) => {
    resp.render('home', {
        session: req.session,
        usuario: req.user
    });
});

router.get('/login', isNotAuth, (req, resp, next) => {
    resp.render('login');
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/error'
}));

/*
router.get('/home', (req, resp, next) => {
    if (!req.isAuthenticated()) {
        return resp.redirect('/')
    }
    resp.render('home', {
        session: req.session,
        usuario: req.user
    });
});
*/

router.get('/logout', (req, resp, next) => {
    req.session.destroy();
    resp.redirect('/')
});

module.exports = router;
