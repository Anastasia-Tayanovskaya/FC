var express = require('express');
var router = express.Router();
var Article =  require('../schema/article.js');
var path = require('path');
var multer  = require('multer');
//var upload = multer({ dest: path.join(__dirname, 'public/uploads') });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
var upload = multer({ storage: storage })

/* GET home page. */

router.get('/', function(req, res, next) {
  Article.find({}, (err, data) => {
    console.log(data);
    res.render('article', { articleData: data  });
  })
});

router.get('/add-new', function(req, res, next) {
  res.render('add-new', {});
});

router.post('/add', upload.single('urlToImage'), function(req,res){
    console.log(req.body);
    let body = req.body;
    let article = new Article({
        title: body.title, 
        description: body.description,
        url: body.url,
        urlToImage: 'uploads/' + req.file.filename,
        author: body.author
    });
    article.save(function (err, article) {
        if (err) return console.error(err);
        res.redirect('/articles');
    });
    // console.log(req.body)
    // console.log(req.file)
    // console.log(req.files)
    // res.json(req.body);
});

router.post('/delete', function(req, res){
    let articleId = req.body.base_id;
    Article.remove({_id: articleId}, function(err) {
        res.redirect('/articles');
    });
})

router.get('/update/:id', function(req, res){
    console.log(req.params);
    Article.find({_id: req.params.id}, (err, data) => {
        console.log(data);
       res.render('update-article', {articleData: data[0], id: req.params.id});
    })
});


router.post('/update', upload.single('urlToImage'), function(req,res){
    console.log(req.body);
    let body = req.body,
        articleId = body.articleId,
        query = { _id: articleId };

    Article.update(query, {
        title: body.title, 
        description: body.description,
        url: body.url,
        //urlToImage: 'uploads/' + req.file.filename,
        author: body.author
    }, {}, function (err, article) {
        if (err) return console.error(err);
        res.redirect('/articles');
    })
});




module.exports = router;