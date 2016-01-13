var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');






var routes = require('./routes/index');


var mongoose = require('mongoose');
var db = mongoose.connect(getDBaddress());//setup DB address



var app = module.exports = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('db',db);
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    req.db = db;
    next();
});




app.use('/', routes);



//setup db location for local and openshift
function getDBaddress(){
	var db_name="expr3ss"
	//provide a sensible default for local development
	var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
	//take advantage of openshift env vars when available:
	if(process.env.OPENSHIFT_MONGODB_DB_URL){
	  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
	}
	console.warn("DB using: "+mongodb_connection_string);
	return  mongodb_connection_string;
	
}


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