var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var ejs = require('ejs');
var fs  = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminSensoresRouter = require('./routes/admin/sensores');
var adminAcionamentosRouter = require('./routes/admin/acionamentos');
var authRouter = require('./routes/auth');
var verifyAuth = require('./middlewares/authMiddle');
var sensorsRouter = require('./routes/sensors');
var actuatorsRouter = require('./routes/actuators');

var app = express();

app.set('trust proxy', 1);
app.use(session({
  secret: 'mySecret123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

/*app.locals({
  buttonStatus: function ligar(){
    var buttonStatus = document.getElementById("change");
      if(buttonStatus == 0)
      <button type="button" class="btn btn-success">Ligar</button>
      else
      <button type="button" class="btn btn-danger">Desligar</button>
    /*var template = fs.readFileSync('acionamento_card.ejs', 'utf-8');
    return ejs.render(template, status);
  }
});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.resolve('./public'))); //complemento para arquivos estáticos

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin/sensores', [verifyAuth], adminSensoresRouter);
app.use('/admin/acionamentos', [verifyAuth], adminAcionamentosRouter);
app.use('/users', usersRouter);
app.use('/sensors', sensorsRouter);
app.use('/actuators', actuatorsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
