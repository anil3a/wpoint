var GeneralReport = function(db){

    objGeneral = this;
    this.script;
    this.db = db;
    
    
    this.create = function(){
        if(objGeneral.script){
            objGeneral.script.show();
            return objGeneral;
        }
        objGeneral.script = $('<div class="general-report"><ul></ul></div>');
        objGeneral.db.select('SELECT date,time FROM wpoint ORDER BY date, time',function(tx,results){
            if(results.rows.length == 0){
                objGeneral.script.append('<span class="general-error">There is no check in on the system.</span>');
                return false;
            }
            var stat = 0; //not working
            var date = "";
            var totalWorked = "00:00"; //all worked hours
            var totalRested = "00:00";
            var working; //variable to save the time start to work, to calculate the range of worked hours
            var resting; //variable to save the resting time
            var initDate; //First checked date
            var finiDate; //Last checked date
            for(i=0;i<results.rows.length;i++){
                try{
                    res = results.rows.item(i);
                    if(date != res.date){
                        if(typeof initDate == 'undefined') initDate = res.date;
                        finiDate = res.date;
                        stat = 0;
                        working = resting = undefined;
                        date = res.date;
                        
                        /*if(i>0){
                            objGeneral.script.find('ul').append('<li class="general-worked-time">Total worked hours ' + totalWorked + '</li>');
                            objGeneral.script.find('ul').append('<li class="general-rested-time">Total rested hours ' + totalRested + '</li>');
                            totalWorked = "00:00";
                            totalRested = "00:00";
                        }*/
                        
                        objGeneral.script.find('ul').append('<li class="general-date">' + date + '</li>');
                    }

                    if(stat == 0){
                        msg = "Start working";
                        stat = 1;
                        working = res.time;
                        if(typeof resting != 'undefined') totalRested = sumTime(totalRested,rangeHours(resting,res.time));
                    }else{
                        msg = "Stop working";
                        stat = 0;
                        totalWorked = sumTime(totalWorked,rangeHours(working,res.time));
                        resting = res.time;
                    }
                    objGeneral.script.find('ul').append('<li class="general-hour">' + res.time + ' - ' + msg + '</li>');
                    
                    if(i == (results.rows.length - 1) || results.rows.item(i+1).date != date){
                        objGeneral.script.find('ul').append('<li class="general-worked-time">Total worked hours ' + totalWorked + '</li>');
                        objGeneral.script.find('ul').append('<li class="general-rested-time">Total rested hours ' + totalRested + '</li>');
                        totalWorked = "00:00";
                        totalRested = "00:00";
                    }
                    
                    
                }catch(e){
                    console.error(e.message);
                    return;
                }
            }
            
            /*$('.general-report').bind('touchstart',function(e){
                touches = e.originalEvent.touches;
                var posY = touches[0].clientY;
                $(this).unbind('touchmove');
                $(this).bind('touchmove',function(e){
                    touches = e.originalEvent.touches;
                    var newPosY = touches[0].clientY;
                    var currPos = newPosY - posY;
                    $(this).css('top',currPos + 'px');
                });
            });*/
            
        });
        
        objGeneral.script.appendTo('.main-page');
        
        return objGeneral;
    }
    
    this.remove = function(){
        objGeneral.script.remove();
        objGeneral.script = undefined;
    }

}