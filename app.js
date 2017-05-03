var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessionParser = require('express-session');
var errorHandler = require('errorhandler');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var handlebars = require('express3-handlebars').create({
    // layoutsDir: __dirname + '/views/layouts', //模板路径
    defaultLayout: 'main', //缺省模板布局
    extname: '.hbs'  //模板扩展名
});

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine);
app.set('views', path.join(__dirname, 'views','layouts'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sessionParser({
    secret: 'blog.fens.me',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'vendor')));

if ('development' === app.get('env')) {
    app.use(errorHandler());
}

//passport认证
passport.use('local', new LocalStrategy(function (username, password, done) {
    //用户帐号
    var user = {
        id: '1',
        username: 'admin',
        password: 'pass'
    };
    //用户名不匹配
    if (username !== user.username) {
        return done(null, false, {message: 'Incorrect username.'});
    }
    //密码不匹配
    if (password !== user.password) {
        return done(null, false, {message: 'Incorrect password.'});
    }
    //认证通过
    return done(null, user);
}));
//保存user对象
passport.serializeUser(function (user, done) {
    done(null, user);
});
//删除user对象
passport.deserializeUser(function (user, done) {
    done(null, user);
});

//路由
app.use('/', index);
app.use('/users', users);

//定制404页面
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

//定制500页面
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('The server is started at http://localhost:'
        + app.get('port') + '; press Ctrl-C to terminate');
});
