var express = require('express');
var router = express.Router();
var passport = require('../auth/passport_config');
var User = require('../model/user');

/* GET users listing. */
router.get('/login', passport.unAuthenticateMiddleware(), function (req, res, next) {
    res.render('user-login');
});

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/users/loginFailure'
// }));
router.post('/login', passport.authenticate('local',
    {failureRedirect: '/users/loginFailure',failureFlash:true}),
    function (req, res) {
        //console.log('user: ' + req.user);
        res.redirect('/');
    });

router.get('/loginFailure', function (req, res) {
    res.render('user-loginFailure', {
        title: 'Login Failure',
        content: req.flash('error') + ' please try again.'
    });
});

router.get('/register', function (req, res) {
    res.render('user-register');
});

router.post('/register', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var user = new User({username: username, password: password});
    //插入数据
    user.save(function (err, user) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('保存数据成功...');
        res.redirect('/users/login');
    });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.render('user-logout', {
        title: 'Logout Successfully',
        content: 'You have logout.'
    });
});

module.exports = router;
