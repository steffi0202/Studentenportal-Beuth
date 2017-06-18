var mongoose = require('mongoose');

var BewertungSchema = mongoose.Schema({
	/*bewID: {
		type: String,
		index:true
	},*/

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
	var query1 = {studiengang: studiengang};
	Bewertung.findOne(query1, callback);
}

module.exports.getBewertungById = function(id, callback){
	Bewertung.findById(id, callback);
}
