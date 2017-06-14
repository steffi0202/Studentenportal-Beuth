var mongoose = require('mongoose');

// User Schema
var DozentSchema = mongoose.Schema({
	vorname: {
		type: String,
		index:true
	},
	nachname: {
		type: String
	},
	fachbereich: {
		type: String
	},
	anzahlbewertungen: {
		type: Number
	},
	durchschnittsbewertung: {
		type: String
	}	
});

var Dozent = module.exports = mongoose.model('Dozent', DozentSchema);

module.exports.createUser = function(newUser, callback){

}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
