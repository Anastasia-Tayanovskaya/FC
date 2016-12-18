var express = require('express');
var router = express.Router();
var Article =  require('../schema/article.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/articles', function(req, res, next) {
//   Article.find({}, (err, data) => {
//     console.log(data);
//     res.render('article', { articleData: data  });
//   })
// });

// router.get('/add-new', function(req, res, next) {
//   res.render('add-new', {});
// });

// router.post('/', function(req,res){
// });


module.exports = router;
