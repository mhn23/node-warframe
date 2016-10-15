var Warframe = require("../index"),
    warframe = new Warframe({ storeAccount: true }),
    config = require("./test_config.json"),
    express = require('express'),
    app = express(),
    engines = require('consolidate'),
    assert = require('assert'),
    MongoClient = require('mongodb').MongoClient,
    jquery = require('jquery');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    app.get('/', function(req, res){

        db.collection('coltest').find({username: "TimSin-EGT-"}).toArray(function(err, data) {
            res.render('index', { 'data': JSON.stringify(data) } );
        });
        
        //res.render('index', { 'data': data } );

    });

    app.use(function(req, res){
        res.sendStatus(404);
    });
    
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});