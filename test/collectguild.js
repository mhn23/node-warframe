var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true }),
    fsPath = require('fs-path');

var config = require('./test_config.json');

warframe.login(config.login.username, config.login.password, function(res){
    
    warframe.getGuild(function(view){
        
        var guild = JSON.parse(view);
        var counter = 0;
        var guilddata = [];
        
        guild.Members.forEach(function(member){
            
            warframe.viewPlayer(config.login.username, config.login.password, member._id.$id, function(data){
                
                var playerinfo = JSON.parse(data);
                
                console.log("collecting:");
                console.log('"username": ' + '"' + member.DisplayName + '"');
                console.log('"id": ' + '"' + member._id.$id + '"');
                
                fsPath.writeFile(__dirname+"/userdata/"+member.DisplayName+"_"+member._id.$id+".json", JSON.stringify(playerinfo), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log(__dirname+"/userdata/"+member._id.$id+"_"+member.DisplayName+".json saved.\n");
                });
                
                guilddata.push({"username": member.DisplayName, "id": member._id.$id, "data": [playerinfo]});
                console.log("test");
                fsPath.writeFile(__dirname+"/guilddata.json", JSON.stringify(guilddata), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log(__dirname+"/userdata/"+member._id.$id+"_"+member.DisplayName+".json saved.\n");
                    
                });
                
            });
            
        });
        
    });
    
});