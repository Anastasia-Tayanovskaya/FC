let nconf = require('nconf');
let mongoose = require('mongoose'); 
nconf.use('file', { file: './config/config.json' });

let user =  nconf.get('user'),
    password = nconf.get('password'),
    host = nconf.get('host'),
    port = nconf.get('port'),
    dbname = nconf.get('dbname');

let mongodbUri = `mongodb:\/\/${user}:${password}@${host}:${port}\/${dbname}`;
 
mongoose.connect(mongodbUri);
let connection = mongoose.connection;             
 
connection.on('error', console.error.bind(console, 'connection error:'));



