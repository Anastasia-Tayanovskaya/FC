let express = require('express');
let router = express.Router();
let User = require('../schema/user.js');
let jwt = require('jsonwebtoken');
let bCrypt = require('bcrypt-nodejs');
const nconf = require('nconf');
nconf.use('file', { file: '../config/config.json' });

let isAuthenticated = function (req, res, next) {
	//if (req.isAuthenticated()) {
		if (true) {
		return next();
	}
	//res.redirect('/login');
}

let isValidPassword = function(user, password){
	console.log(password);
	console.log(user.password);
	console.log(bCrypt.hashSync(password, bCrypt.genSaltSync(10), null));
	console.log(bCrypt.compareSync(password, user.password))
	return bCrypt.compareSync(password, user.password);
}

router.post('/authenticate', function(req, res) {

  User.findOne({
   'username': req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      if (!isValidPassword(user, req.body.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        let token = jwt.sign(user, nconf.get('secret'), {
          expiresIn : 60*60*24
        });
        
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});


module.exports = router;