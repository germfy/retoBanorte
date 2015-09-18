
var http = require('http');
var express = require('express');
var cfenv = require('cfenv');
var routes = require('./routes/servicios.js');

var app = express();
var appEnv = cfenv.getAppEnv();
var appServices = appEnv.getService('SQL Database-ls');

console.log(appEnv);
console.console.log(appServices);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

app.set('port', port);

var server = app.listen(appEnv.port, appEnv.bind, function(){
  console.log('Express server listening on port ' + server.address().port);
});
