let express = require('express');
let router = express.Router();
let Article =  require('../schema/article.js');
let path = require('path');
let multer  = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
let upload = multer({ storage: storage });

let isAuthenticated = function (req, res, next) {
	//if (req.isAuthenticated()) {
    if (true) {
		return next();
    }
	//res.redirect('/');
}


router.get('/', function(req, res, next) {
  Article.find({}, (err, articles) => {
    if (err) { res.send(err); return; }
    res.json(articles);
  })
});

router.get('/add-new', function(req, res, next) {
  res.render('add-new', {});
});

router.post('/', upload.single('file'), function(req, res){
    console.log(req.body);
    let body = req.body,
        image = (req && req.file && req.file.filename) ? req.file.filename : 'no_image.png';
    let article = new Article({
        title: body.title, 
        description: body.description,
        url: body.url,
        urlToImage: 'uploads/' + image,
        author: body.author
    });
    article.save(function (err, article) {
        if (err) {
            res.send(err);
            return;
        }
        res.json({ message: 'Article created!' });
        //res.redirect('/api/articles');
    });
});

router.get('/:article_id', isAuthenticated, function(req, res) {
    Article.findById(req.params.article_id, function(err, article) {
        if (err) {
            res.send(err);
            return;
        }
        res.json(article);
    });
});

// router.post('/delete', function(req, res){
//     let articleId = req.body.base_id;
//     Article.remove({_id: articleId}, function(err) {
//         res.redirect('/articles');
//     });
// })

// router.get('/update/:id', function(req, res){
//     Article.find({_id: req.params.id}, (err, data) => {
//        res.render('update-article', {articleData: data[0], id: req.params.id});
//     })
// });

router.delete('/:article_id', function(req, res) {
        Article.remove({
            _id: req.params.article_id
        }, function(err, article) {
            if (err) {
                res.send(err);
                return;
            }

            res.json({ message: 'Successfully deleted' });
        });
    });

router.put('/:article_id', upload.single('file'), function(req, res) {
    let body = req.body,
        image = (req && req.file && req.file.filename) ? req.file.filename : 'no_image.png',
        updatedArticle = {
            title: body.title, 
            description: body.description,
            url: body.url,
            urlToImage: 'uploads/' + image,
            author: body.author
        };

    Article.update({ _id: req.params.article_id }, updatedArticle, {}, function (err, article) {
        if (err) {
            res.send(err);
            return;
        }
        res.json({ message: 'Article updated!' });
    })
});



// router.post('/update', upload.single('urlToImage'), function(req,res){
//     console.log(req.body);
//     let body = req.body,
//         articleId = body.articleId,
//         query = { _id: articleId },
//         updatedObj = {}, urlToImage;
    
//     if (req.file && req.file.filename) {
//         urlToImage = 'uploads/' + req.file.filename;
//         updatedObj = {
//             title: body.title, 
//             description: body.description,
//             url: body.url,
//             urlToImage: urlToImage,
//             author: body.author
//         }
//     }
//     else {
//         updatedObj = {
//             title: body.title, 
//             description: body.description,
//             url: body.url,
//             author: body.author
//         }
//     }

//     Article.update(query, updatedObj, {}, function (err, article) {
//         if (err) return console.error(err);
//         res.redirect('/articles');
//     })
// });

module.exports = router;