var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}




/*
var BewertungSchema = mongoose.Schema({
/*	bewID: {
		type: String,
		index:true
	},*/
/*	
	studiengang: {
		type: String,
		index:true
	},
	semester: {
		type: String
	},
	modul: {
		type: String
	},
	modulbeschreibung: {
		type: String
	},
	dozent: {
		type: String
	},
	dozentbeschreibung: {
		type: String
	},
	aufwand: {
		type: Number
	},
	bewertung: {
		type: Number
	}
});

var Bewertung = module.exports = mongoose.model('Bewertung', BewertungSchema);

module.exports.createBewertung = function(newBewertung, callback){
	newBewertung.save(callback);
}

module.exports.getBewertungByStudiengang = function(studiengang, callback){
	var query = {studiengang: studiengang};
	Bewertung.findOne(query, callback);
}

module.exports.getBewertungById = function(id, callback){
	Bewertung.findById(id, callback);
}
*/