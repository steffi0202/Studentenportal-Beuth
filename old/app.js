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

var multer = require('multer');
var formidable = require('formidable');
var fs = require('fs');

//var multer = require('multer');
/*
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
	if(!file.originalname.match(/\.(jpg|jpeg|png|doc|docx|xls|odt|ods|pdf|ppt)$/)){
		var err = new Error();
		err.code = 'filetype';
		return cb(err);
		
	} else{
		cb(null, Date.now() + '_' + file.originalname);
	}
	
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ 
	storage: storage ,
	limits: {fileSize: 10000000}
}).single('myfile');
*/
mongoose.connect('mongodb://localhost/beuthportal');
var db = mongoose.connection;

var routes = require('./routes/dashboard');
var users = require('./routes/users');

// Init App
var app = express();
/*
app.post('/uploads', function (req, res) {
  upload(req, res, function (err) {
	if(err){
		if (err.code === 'LIMIT_FILE_SIZE') {
			res.json({success: false, message: 'Die Datei ist zu groß (max. 10 MB)'});
		} else if (err.code === 'filetype'){
			res.json({success: false, message: 'Datentyp wird nicht unterstützt'});
		} else{
			console.log(err);
			res.json({success: false, message: 'Datei konnte nicht hochgeladen werden'});
		} 
	} else {
		if (!req.file){
			res.json({success: false, message: 'Keine Datei ausgewählt'});
		} else{
			res.json({success: true, message: 'Datei hochgeladen'});
		}
	}
    // Everything went fine
  })
})*/

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

app.get('/beuthportal', function(req, res){
	//console.log("I received a GET request")

	db.beuthportal.find(function(err, docs){
		//console.log(docs);
		res.json(docs);
	});
});

//POST-Request
app.post('/beuthportal', function(req, res){
	//console.log(req.body);
	db.beuthportal.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

//Löscht Eintrag aus Datenbank
app.delete('/beuthportal/:id', function(req, res){
	var id = req.params.id;
	//console.log(id);
	db.beuthportal.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	});
});

//GET-Request 
app.get('/beuthportal/:id', function(req, res){
	var id = req.params.id;
	//console.log(id);
	db.beuthportal.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	});
});

//Updated die Datenbank
app.put('/beuthportal/:id', function(req, res){
	var id = req.params.id;
	//console.log(req.body.name);
	db.beuthportal.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number:req.body.number}},
	new: true}, function (err, doc) {
		res.json(doc);
	});
});

//Datei Upload
app.get('/upload', function(req, res){

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
 
});

app.post('/fileupload', function(req, res){

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Studentenportal-Beuth/nodeprojects/beuthportal/public/uploads/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded');
        res.end();
      });
 	});
});    

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server laeuft auf Port '+app.get('port'));
});



