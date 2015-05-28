var DateTime = function(db){
    objDatetime = this;
    this.db = db;
    this.script;
    
    if(!jQuery){
        console.error(utf8_decode('It\'s not possible to open the object without jQuery'));
        return false;
    } 
    
    if(typeof db != 'object'){
        console.error(utf8_decode('You can\'t use the function without a database'));
        return false;
    } 
    
    this.create = function(func){
        
        if(objDatetime.script){
            objDatetime.script.show();
            return objDatetime;
        }
        
        var strHTML;
        
        objDatetime.db.execute('CREATE TABLE IF NOT EXISTS wpoint(id INTEGER AUTO_INCREMENT,date,time)');
       // objDatetime.db.execute('DELETE FROM wpoint');
        
        $('<div>').load('objects/DateTime/DateTime.html',function(){
            
            objDatetime.script = $($(this).html());
            
            objDatetime.script.appendTo('.main-page');
            objDatetime.load(func);
            objDatetime.setTypeButton();
            
            objDatetime.btnClick(function(){
                objDatetime.checkOn(function(tx,results){
                    objDatetime.setTypeButton();
                });
            });
            
            objDatetime.script.find('.date,.time').bind('tap',function(e){
                 $(this).select();
                this.setSelectionRange(9999 , 9999);
                e.preventDefault();
                return false;
            })
            .bind('keypress',function(e){
                var obj = $(this);
                keycode = e.which;
                if(keycode > 47 && keycode < 58){
                    return true;
                }
                return false;
            });
            
            objDatetime.script.find('.time').bind('keyup',function(e){
                var obj = $(this);
                var newVal = obj.val();
                if(newVal.substr(newVal.length-1) == ":") return false;
                newVal = newVal.replace(/:/gi,"");
                if(newVal.length > 2) newVal = newVal.substr(0,2) + ":" + newVal.substr(2,2);
                 obj.val(newVal);
            });
            
            objDatetime.script.find('.date').bind('keyup',function(e){
                var obj = $(this);
                var newVal = obj.val();
                if(newVal.substr(newVal.length-1) == "-") return false;
                newVal = newVal.replace(/\-/gi,"");
                if(newVal.length > 4 && newVal.length < 7)  newVal = newVal.substr(0,4) + "-" + newVal.substr(4,2);
                else if(newVal.length > 6 ) newVal = newVal.substr(0,4) + "-" + newVal.substr(4,2) + "-" + newVal.substr(6,2);
                 obj.val(newVal);
            });
            
        });
        
        return objDatetime;
    }
    
    this.load = function(success){
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hour = date.getHours();
        var minute = date.getMinutes();        
        day = String(day).repeatBefore("0",2);
        month = String(month).repeatBefore("0",2);
        hour = String(hour).repeatBefore("0",2);
        minute = String(minute).repeatBefore("0",2);
        
        objDatetime.script.find('.date').val(year + '-' + month + '-' + day);
        objDatetime.script.find('.time').val(hour + ':' + minute);
        
        if(typeof success == 'function') this.success = success
        else this.success = function(){};
        this.success();
    }
    
    this.valid = function(){
        return (String(objDatetime.script.find('.date').val()).isDate() && String(objDatetime.script.find('.time').val()).isTime());
    }
    
    this.btnClick = function(funcTrue,funcFalse){
        objDatetime.script.find('.btn-action').unbind();
        $('.btn-action').bind('click',function(e){
            objDatetime.funcTrue = funcTrue;
            objDatetime.funcFalse = funcFalse;
            var validation = objDatetime.valid();
            if(validation && typeof objDatetime.funcTrue == 'function') objDatetime.funcTrue();
            if(!validation && typeof objDatetime.funcFalse == 'function') objDatetime.funcFalse();
        });
    }
    
        
    this.setTypeButton = function(){
        objDatetime.db.select('SELECT date,time FROM wpoint ORDER BY date DESC, time DESC',function(tx,results){
                if(results.rows.length % 2 == 0) objDatetime.script.find('.btn-action').html('Start Working').removeClass('inactive').addClass('active');
                else objDatetime.script.find('.btn-action').html('Stop Working').removeClass('active').addClass('inactive');
        });
    }
    
    this.checkOn = function(success){
        this.success = success;
        objDatetime.db.select('INSERT INTO wpoint(date,time)values("' + objDatetime.script.find('.date').val() + '","' + objDatetime.script.find('.time').val() + '")',function(tx,success){objDatetime.success(tx,success);});
    }
    
    this.remove = function(){
        objDatetime.script.remove();
        objDatetime.script = undefined;
    }
}