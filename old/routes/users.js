var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// Startseite
router.get('/main', function(req, res){
	res.render('main');
});

// About
router.get('/about', function(req, res){
	res.render('about');
});

// Dozentenbewertung
router.get('/dozenten', ensureAuthenticated, function(req, res){
	res.render('dozenten');
});

// Modulbewertung
router.get('/module', ensureAuthenticated, function(req, res){
	res.render('module');
});

// Dokumente hochladen
router.get('/uploads', ensureAuthenticated, function(req, res){
	res.render('uploads');
});

// Dokumente hochladen
router.get('/service', ensureAuthenticated, function(req, res){
	res.render('uploadFileService');
});

// Dokumente hochladen
router.get('/controllers', ensureAuthenticated, function(req, res){
	res.render('mainCtrl');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/main');
	}
}

// Impressum
router.get('/impressum', function(req, res){
	res.render('impressum');
});

// Kontakt
router.get('/kontakt', function(req, res){
	res.render('kontakt');
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name ist ein Pflichtfeld').notEmpty();
	req.checkBody('email', 'E-Mail ist ein Pflichtfeld').notEmpty();
	//Hier wird mit einer RegEx geprüft, ob die E-Mail-Adresse eine Beuth-Adresse ist
	req.checkBody('email', 'Die eingegebene E-Mail-Adresse ist keine gültige Beuth-Adresse').matches('^[A-Za-z0-9._%+-]+@beuth-hochschule.de$');
	//req.checkBody('email', 'Die eingegebenen E-Mail-Adressen stimmen nicht überein').isEmail();
	req.checkBody('username', 'Username ist ein Pflichtfeld').notEmpty();
	req.checkBody('password', 'Passwort ist ein Pflichtfeld').notEmpty();
	req.checkBody('password2', 'Die eingegebenen Passwörter stimmen nicht überein').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'Du bist registriert und kannst dich jetzt einloggen!');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'User unbekannt'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Ungültiges Passwort'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'Du hast dich ausgeloggt');

	res.redirect('/users/login');
});

module.exports = router;