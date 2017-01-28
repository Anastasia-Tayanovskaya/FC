let express = require('express');
let router = express.Router();
let User = require('../schema/user.js');
let jwt = require('jsonwebtoken');
let bCrypt = require('bcrypt-nodejs');
const nconf = require('nconf');
nconf.use('file', { file: '../config/config.json' });

let isValidPassword = function(user, password){
	return bCrypt.compareSync(password, user.password);
}

let createHash = function(password){
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

router.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

router.get('/setup', function(req, res) {
  	let newUser = new User();

	newUser.username = "admin2";
	newUser.password = createHash('password');
	newUser.email = 'asd@mail.ru';
	newUser.firstName = 'Nick';
	newUser.lastName = "Cerminara";

	newUser.save(function(err) {
		if (err){
			console.log('Error in Saving user: '+err);
			throw err;
		}
		console.log('User Registration succesful');
		res.json({ success: true });
	});
});

module.exports = router;