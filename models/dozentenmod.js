var mongoose = require('mongoose');

// User Schema
var BewertungSchema = mongoose.Schema({
	bewID: {
		type: String,
		index:true
	},
	semester: {
		type: String
	},
	studiengang: {
		type: String
	},
	dozent: {
		type: String
	},
	modulName: {
		type: String
	},
	modulBeschreibung: {
		type: String
	},
	dozentBeschreibung: {
		type: String
	},
	anzahlStunden: {
		type: Number
	},
	anzahlBewertungen: {
		type: Number
	},
	abgegebeneBewertung: {
		type: Number
	},
	durchschnittsbewertung: {
		type: Number
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
