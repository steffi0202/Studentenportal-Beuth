var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('beuthportal', ['beuthportal']);
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');

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

app.listen(3000);
console.log("Server running on port 3000");