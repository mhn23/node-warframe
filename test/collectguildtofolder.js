var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true }),
    fsPath = require('fs-path'),
    moment = require("moment"),
    config = require('./test_config.json');

moment.locale("de");
warframe.login(config.login.username, config.login.password, function(res){
    
    warframe.getGuild(function(view){
        
        var guild = JSON.parse(view);
        var counter = 0;
        
        guild.Members.forEach(function(member){
            
            warframe.viewPlayer(config.login.username, config.login.password, member._id.$id, function(data){
                
                var playerinfo = JSON.parse(data);
                
                if (member.DisplayName.endsWith(".")) {
                    var memberName = member.DisplayName.substring(0, member.DisplayName.length - 1);
                } else {
                    var memberName = member.DisplayName;
                }
                
                console.log("collecting:");
                console.log('"username": ' + '"' + member.DisplayName + '"');
                console.log('"id": ' + '"' + member._id.$id + '"');
                
                var path = "\\userdata\\"+memberName+"\\"+member._id.$id+"\\"+moment().format("DD MMMM YYYY, HH-mm")+".json";
                
                fsPath.writeFile(__dirname+path, JSON.stringify(playerinfo), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log(__dirname+path+" saved.\n");
                });
                
            });
            
        });
        
    });
    
});