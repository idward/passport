var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/login', function (req, res, next) {
    res.render('user-login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/loginFailure'
}));

router.get('/loginFailure', function (req, res) {
    res.render('user-loginFailure');
});

module.exports = router;
