//let mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/posts');
//mongoose.connect('mongodb://heroku_4bqlmh1p:anastas123@ds119548.mlab.com:19548/heroku_4bqlmh1p');


var mongoose = require('mongoose');
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
 
var mongodbUri = 'mongodb://admin:admin@ds119548.mlab.com:19548/heroku_4bqlmh1p';
 
mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  

let Article = mongoose.model('Articles', {
    title: { type: String, required: true },
    author: { type: String, required: true, default: "Unknown"},
    publishedAt: { type: Date, required: true, default: Date.now},
    urlToImage: { type: String },
    url: { type: String },
    description: { type: String }

});

module.exports = Article;