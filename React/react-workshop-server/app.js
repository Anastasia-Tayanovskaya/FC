const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const authentication = require('./routes/authentication');
const index = require('./routes/index');
const users = require('./routes/users');
const articles = require('./routes/articles');

const stylus = require('stylus');
const nib = require('nib');

const jwt = require('jsonwebtoken');

const nconf = require('nconf');
nconf.use('file', { file: './config/config.json' });

var port = process.env.PORT || '3005'; 
const dbconnection = require('./schema/dbconnection.js');

const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, nconf.get('uploads')) });

const app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(stylus.middleware({
    src: path.join(__dirname, 'public'),
    compile: compile
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());


app.use('/api', authentication);

/* close the rest of routes with authentication */
app.use(function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, nconf.get('secret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});


app.use('/api', index);
app.use('/users', users);
app.use('/api/articles', articles);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.listen(port);

module.exports = app;
