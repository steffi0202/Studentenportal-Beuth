var express = require('express');
var router = express.Router();

// Get Homepage
<<<<<<< HEAD
router.get('/users/dashboard', ensureAuthenticated, function(req, res){
=======
router.get('/', ensureAuthenticated, function(req, res){
>>>>>>> d33c735874449f05d0080cd4bef0f6896562df96
	res.render('dashboard', { title: 'Studentenportal'});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/main');
	}
}

module.exports = router;