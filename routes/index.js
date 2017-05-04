var express = require('express');
var router = express.Router();
var passport = require('../auth/passport_config');

/* GET home page. */
router.get('/', passport.authenticateMiddleware(), function(req, res, next) {
  res.render('home', { title: 'Express' });
});

module.exports = router;
