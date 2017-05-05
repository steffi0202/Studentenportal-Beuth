var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('beuthportal', ['beuthportal']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

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

app.listen(3000);
console.log("Server running on port 3000");