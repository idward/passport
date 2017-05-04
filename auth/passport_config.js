var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

//passport认证策略
passport.use('local', new LocalStrategy(function (username, password, done) {
    //用户帐号
    // var user = {
    //     id: '1',
    //     username: 'admin',
    //     password: 'pass'
    // };
    var auth_user = {username: username};
    //读取数据库
    mongoose.model('users').findOne(auth_user, function (err, user) {
        console.log(user);
        //数据库错误
        if (err) {
            return done(null, false, {message: 'Database error.'});
        }
        //用户名不匹配
        if (!user) {
            return done(null, false, {message: 'Incorrect username.'});
        }
        //密码不匹配
        if (password !== user.password) {
            return done(null, false, {message: 'Incorrect password.'});
        }
        //认证通过
        return done(null, user);
    });

}));
//保存user对象
passport.serializeUser(function (user, done) {
    done(null, user);
});
//删除user对象
passport.deserializeUser(function (user, done) {
    done(null, user);
});

//验证用户是否合法
passport.authenticateMiddleware = function authenticateMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.render('user-loginFailure', {
            title: 'Not Access',
            content: 'You have not access to visit the website, please try again.'
        });
    }
};
//登录页面单独验证
passport.unAuthenticateMiddleware = function unAuthenticateMiddleware() {
    return function (req, res, next) {
        if (req.isUnauthenticated()) {
            return next();
        }
        res.redirect('/');
    }
};

module.exports = passport;
