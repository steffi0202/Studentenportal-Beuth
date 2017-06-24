var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

var formidable = require('formidable');
var fs = require('fs');

mongoose.connect('mongodb://localhost/beuthportal');
var db = mongoose.connection;

var routes = require('./routes/dashboard');
var users = require('./routes/users');

// Init App
var app = express();

//Testing

var cache = {};

	function sayHello(){
		return 'hello';	
	};
	
	function addNumbers(value1, value2){
		return value1 + value2;
	};
	
app.post('/set', function(req, res) {
  var query = req.query;
  Object.keys(query).forEach(function(key) {
    cache[key] = query[key];
  });
  res.status(200).end();
});

app.get('/get', function(req, res) {
  res.send(cache[req.query.key]);
});

module.exports = {
	sayHello,
	addNumbers
};
module.exports = app;


// Handlebars Konfiguration
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash Middleware
app.use(flash());

// Global Vars für Flash-Messages
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);


//UPLOAD-TEIL von Christoph

app.post('/fileupload', function(req, res){

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = './uploads/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded');
        res.end();
      });
 	});
});    

//Download-TEIL von Christoph
/*
app.get('/download', function(req, res){

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<a href="/uploads/Zusammenfassung_MEAN.pdf">Zusammenfassung_MEAN.pdf</a>')

    return res.end();
 
});
*/
app.get('/download', function(req, res){
	var file = __dirname + '/uploads/' + 'Zusammenfassung_MEAN.pdf';
	
 	res.download(file);

});


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server laeuft auf Port '+app.get('port'));
});