var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true }),
    MyIO = require('../myIO'),
    myIO = new MyIO(),
    fs = require('fs');

var config = require('./test_config.json');

warframe.login(config.login.username, config.login.password, function(res){
    var someID='5732f3f03ade7fe65dbec877';
    var someUsername='SomeUsername';
/*    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('accountId of the user you want to read: ', (answer) => {
        // TODO: Log the answer in a database
        console.log('given id:', answer);
*/        
    warframe.viewPlayer(config.login.username, config.login.password, someID, function(data){
        var playerinfo = JSON.parse(data);
        myIO.savePlayerStats(someUsername, someID,playerinfo); 
    });

});
