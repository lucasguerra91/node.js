// Importacion de las librerias necesarias
var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




// Set the mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://lguerra:ampersand@ds143099.mlab.com:43099/local_library';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));




// Estos archivos contienen codigo para manejar las rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalog = require('./routes/catalog'); //Import routes for "catalog" area of site

// Seteando el router para la Wiki, solo practica
var wiki = require('./wiki');

// Creacion del objeto app usando el modulo express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))  <-- Aca iria nuestro icono
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Se define el uso de los manejadores de rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
// A partir de aca puedo usar use()
app.use('/wiki', wiki);
app.use('/catalog', catalog); // Add catalog routes to middleware chain.




// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;