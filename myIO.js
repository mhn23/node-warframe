var fsPath = require('fs-path');

function MyIO(params){

    var SAVE_LOCATION = "./userdata/";
    
    this.savePlayerStats= function(psUsername, psId, playerinfo){
        var _this = this;
        
        fsPath.writeFile(SAVE_LOCATION+psUsername+"_"+psId+"_"+_this.generateTimestamp()+".json", JSON.stringify(playerinfo), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(SAVE_LOCATION+psUsername+"_"+psId+"_"+_this.generateTimestamp()+".json saved.\n");
        });
    };
    
    this.generateTimestamp= function(){
        var result;
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        if(month.toString().length == 1) {
        var month = '0'+month;
        }
        if(day.toString().length == 1) {
        var day = '0'+day;
        }   
        if(hour.toString().length == 1) {
        var hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
        var minute = '0'+minute;
        }
        if(second.toString().length == 1) {
        var second = '0'+second;
        }   
        result = year+'.'+month+'.'+day+'_'+hour+'-'+minute+'-'+second;
//        console.log('result:'+result);
        return result;
    };
    
    
    return this;
}

module.exports = MyIO;