var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessionParser = require('express-session');
var errorHandler = require('errorhandler');
var flash = require('express-flash');
//连接mongodb数据库
var db = require('./db/db');
//handlebar模板
var handlebars = require('express3-handlebars').create({
    layoutsDir: __dirname + '/views/layouts', //模板路径
    defaultLayout: 'main', //缺省模板布局
    extname: '.hbs'  //模板扩展名
});
//加载passport模块
var passport = require('./auth/passport_config');

//加载路由模块
var index = require('./routes/index');
var users = require('./routes/users');
//初始化
var app = express();
//设置端口
app.set('port', process.env.PORT || 3000);
//设置模板引擎
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine);
app.set('views', path.join(__dirname, 'views', 'layouts'));
//加载静态资源
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'vendor')));
//中间件
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sessionParser({
    secret: 'blog.fens.me',
    // cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
//passport初始化
app.use(passport.initialize());
app.use(passport.session());
//开发环境
if ('development' === app.get('env')) {
    app.use(errorHandler());
}
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
//监听端口
app.listen(app.get('port'), function () {
    console.log('The server is started at http://localhost:'
        + app.get('port') + '; press Ctrl-C to terminate');
});