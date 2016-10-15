var Warframe = require("../index"),
    warframe = new Warframe({ storeAccount: true }),
    config = require("./test_config.json"),
    express = require('express'),
    app = express(),
    engines = require('consolidate'),
    assert = require('assert'),
    MongoClient = require('mongodb').MongoClient,
    jquery = require('jquery'),
    mongoose = require('mongoose');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Mongoose connection to MongoDB (ted/ted is readonly)
mongoose.connect('mongodb://localhost:27017/test', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: String,
    username: String,
    id: String,
    data: Array
});

// Mongoose Model definition
var User = mongoose.model('coltest', UserSchema);

// Bootstrap express
var app = express();

// URLS management

app.get('/', function (req, res) {
    res.send("<a href='/users'>Show tim</a>");
});

app.get('/users', function (req, res) {
    User.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.get('/users/:email', function (req, res) {
    if (req.params.email) {
        User.find({ email: req.params.email }, function (err, docs) {
            res.json(docs);
        });
    }
});

// Start the server
app.listen(80);
