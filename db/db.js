var mongoose = require('mongoose');

var db = mongoose.connection;

mongoose.connect('mongodb://localhost/passport');

db.on('open', function () {
    console.log('数据库连接成功...');
});

db.on('error', function (err) {
    console.log('数据库连接失败...');
    console.log(err.stack);
});

module.exports = db;