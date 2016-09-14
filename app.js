var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require("./routes/dashboard");
var index = require("./routes/index");
var woscom = express();

// view engine setup
woscom.set('views', path.join(__dirname, 'views'));
woscom.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//woscom.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
woscom.use(logger('dev'));
woscom.use(bodyParser.json());
woscom.use(bodyParser.urlencoded({ extended: false }));
woscom.use(cookieParser());
woscom.use(express.static(path.join(__dirname, 'public')));

woscom.get('/', index.index);
woscom.get('/dashboard', admin.dashboard);

// catch 404 and forward to error handler
woscom.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (woscom.get('env') === 'development') {
  woscom.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
woscom.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

woscom.listen(8888);
console.log("DDL")
module.exports = woscom;
