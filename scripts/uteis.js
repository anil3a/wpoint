function utf8_decode(str_data) {
  //  discuss at: http://phpjs.org/functions/utf8_decode/
  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
  //    input by: Aman Gupta
  //    input by: Brett Zamir (http://brett-zamir.me)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Norman "zEh" Fuchs
  // bugfixed by: hitwork
  // bugfixed by: Onno Marsman
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: kirilloid
  //   example 1: utf8_decode('Kevin van Zonneveld');
  //   returns 1: 'Kevin van Zonneveld'

  var tmp_arr = [],
    i = 0,
    ac = 0,
    c1 = 0,
    c2 = 0,
    c3 = 0,
    c4 = 0;

  str_data += '';

  while (i < str_data.length) {
    c1 = str_data.charCodeAt(i);
    if (c1 <= 191) {
      tmp_arr[ac++] = String.fromCharCode(c1);
      i++;
    } else if (c1 <= 223) {
      c2 = str_data.charCodeAt(i + 1);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      i += 2;
    } else if (c1 <= 239) {
      // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    } else {
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      c4 = str_data.charCodeAt(i + 3);
      c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
      c1 -= 0x10000;
      tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
      tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
      i += 4;
    }
  }

  return tmp_arr.join('');
}


/**
* Function used to complete a string with some specific character
*
* @var string str - which character will be repeated
* @var string times - times the character will be repeated
* @return the string completed with the specific character
* @author Wellington Viveiro (http://www.wviveiro.com.br/en)
*/
String.prototype.repeatBefore = function (str,times){
    var total = Array(times).join(str);
    total = total + this.valueOf();
    length = total.length;
    if(this.valueOf().length > times) return this.valueOf();
    return total.substr(length-times);
}

/**
* Function to validate a date format
*
* @author Wellington Viveiro (http://www.wviveiro.com.br/en)
*/
String.prototype.isDate = function(){
    //String date most to be yyy-mm-dd or yyyy/mm/dd
    var text = this.valueOf();
    text = text.replace(/\//gi,'-');
    var aux = text.split('-');
    if(aux.length != 3){
        console.error('Invalid date (' + text + ')');
        return false;
    }
    if(aux[0].length != 4 || isNaN(aux[0])){
        console.error('Invalid date (' + text + ')');
        return false;
    }
    if(aux[1].length != 2 || isNaN(aux[1])){
        console.error('Invalid date (' + text + ')');
        return false;
    }
    if(aux[2].length != 2 || isNaN(aux[2])){
        console.error('Invalid date (' + text + ')');
        return false;
    }
    
    var d = new Date(aux[0],parseInt(aux[1])-1,aux[2]);
    if(d && d.getFullYear() == Number(aux[0]) && (d.getMonth() + 1) == Number(aux[1]) && d.getDate() == Number(aux[2])){
       /* var today = new Date();
        var strToday = String(today.getFullYear()) + String((today.getMonth()+1)) + String(today.getDate());
        var strDate = String(d.getFullYear()) + String((d.getMonth()+1)) + String(d.getDate());
        if(strDate > strToday){
            console.error('You can\'t check it on the future (' + aux.join('-') + ')');
            return false;
        }*/
        return true;
    }else{
        console.error('Invalid date (' + aux.join('-') + ')',d);
        return false;
    }
    
}

/**
* Function to validate a time format
*
* @author Wellington Viveiro (http://www.wviveiro.com.br/en)
*/
String.prototype.isTime = function(){
    //String time most to be hh:mm
    var text = this.valueOf();
    var aux = text.split(':');
    if(aux.length != 2){
        console.error('Invalid time (' + text + ')');
        return false;
    }
    if(aux[0].length != 2 || isNaN(aux[0]) || parseInt(aux[0]) < 0 || parseInt(aux[0]) > 23){
        console.error('Invalid time (' + text + ')');
        return false;
    }
    if(aux[1].length != 2 || isNaN(aux[1]) || parseInt(aux[1]) < 0 || parseInt(aux[1]) > 59){
        console.error('Invalid time (' + text + ')');
        return false;
    }
    
     return true;
}

/*
* Function Exception
*/
function Exception(message){
    this.message = message;
}

/**
* Function to calculate the range of hours
*
* @var string hourInit - first hour to calculate the range of hours
* @var string hourFini - second hour to calculate the range of hours
* @return the function return how many hours take from the hourInit to hourFinish
* @obs both strings must have hour and minutes (hh:mm)
*/
function rangeHours(hourInit,hourFini){
    if(typeof hourInit != 'string' || typeof hourFini != 'string'){
        throw new Exception('(rangeHours error 001) Wrong variable(s) check whether both variables are strings');
        return false;
    }
    hourInit = hourInit.split(':');
    hourFini = hourFini.split(':');
    if(hourInit.length != 2 || hourFini.length != 2){
        throw new Exception('(rangeHours error 002) Wrong variable(s) check whether both variables are time format (hh:mm)');
        return false;
    }
    if(hourInit[0].length != 2 || hourFini[0].length != 2 || hourInit[1].length != 2 || hourFini[1].length != 2){
        throw new Exception('(rangeHours error 003) Wrong variable(s) check whether both variables are time format (hh:mm)');
        return false;
    }
    
    hourInit[0] = Number(hourInit[0]); hourInit[1] = Number(hourInit[1]);
    hourFini[0] = Number(hourFini[0]); hourFini[1] = Number(hourFini[1]);
    if(hourInit[0]>23 || hourInit[0]<0 || hourInit[1] > 59 || hourInit[1] < 0 || hourFini[0]>23 || hourFini[0]<0 || hourFini[1] > 59 || hourFini[1] < 0){
        throw new Exception('(rangeHours error 004) Wrong variable(s) check whether both variables are time format (hh:mm)');
        return false;
    }
    
    if((hourInit[0] > hourFini[0]) || (hourInit[0] == hourFini[0] && hourInit[1] > hourFini[1])){
        throw new Exception('(rangeHours error 004) The second hour must be higher than the first hour');
        return false;
    }
    
    var totalMinutesIni = 0; //We will transform all the time in minutes
    var totalMinutesFin = 0;
    var totalRange;
    
    totalMinutesIni = (hourInit[0]*60) + hourInit[1];
    totalMinutesFin = (hourFini[0]*60) + hourFini[1];
    
    totalRange  = totalMinutesFin - totalMinutesIni;
    
    var hour = Math.floor(totalRange/60);
    var minute = totalRange - (hour*60);
    
    return String(hour).repeatBefore("0",2) + ":" + String(minute).repeatBefore("0",2);
}

/**
* Function to calculate the sum of two times
*
* @var string time1 - first time that will be sum
* @var string time2 - second time thar will be sum
* @return the sum of two times
*/
function sumTime(time1,time2){
    if(typeof time1 != 'string' || typeof time2 != 'string'){
        throw new Exception('(sumTime error 001) Wrong variable(s) check whether both variables are strings');
        return false;
    }
    time1 = time1.split(':');
    time2 = time2.split(':');
    if(time1.length != 2 || time2.length != 2){
        throw new Exception('(sumTime error 002) Wrong variable(s) check whether both variables are time format (hh(h):mm) hour two digits at least');
        return false;
    }
    if(time1[0].length < 2 || time2[0].length < 2 || time1[1].length != 2 || time2[1].length != 2){
        throw new Exception('(sumTime error 003) Wrong variable(s) check whether both variables are time format (hh(h):mm) hour two digits at least');
        return false;
    }
    time1[0] = Number(time1[0]); time1[1] = Number(time1[1]);
    time2[0] = Number(time2[0]); time2[1] = Number(time2[1]);
    if(time1[0]<0 || time1[1] > 59 || time1[1] < 0 || time2[0]<0 || time2[1] > 59 || time2[1] < 0){
        throw new Exception('(sumTime error 004) Wrong variable(s) check whether both variables are time format (hh(h):mm) hour two digits at least');
        return false;
    }
    
    var totalMinutes = 0;
    totalMinutes = time1[1] + time2[1];
    var minuteToHour = Math.floor(totalMinutes/60);
    totalMinutes -= minuteToHour*60;
    var totalHours = time1[0] + time2[0] + minuteToHour;
    
    return String(totalHours).repeatBefore('0',2) + ":" + String(totalMinutes).repeatBefore('0',2);
}

if(jQuery){
    jQuery.fn.extend({
        wtap: function(func){
            var tap = false;
            $(this).bind('touchstart',function(){tap=true;})
            .bind('touchmove',function(){tap=false;})
            .bind('touchend',function(e){
                this.func = func;
                if(tap && typeof this.func == 'function') this.func(e);
            });
            return $(this);
        },
        ntap: function(func){
            var auxStamp;
            var auxPos;
            $(this).bind('tap',function(e){
                var newPos = e.clientX+'x'+e.clientY
                var newStamp = e.timeStamp;
                if(typeof auxStamp != 'undefined'){
                    if((newStamp - auxStamp) < 190) return false;
                }
                if(typeof auxPos != 'undefined'){
                    if(auxPos == newPos) return false;
                }
                auxPos = newPos;
                auxStamp = newStamp;
                this.func = func;
                this.func(e);
                e.preventDefault();
            });
        }
    });
    
    /**
    * Function to reset the database
    */
    function resetDB(obj){
        obj.execute('DELETE from wpoint');
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-05','07:55')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-05','11:58')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-05','12:45')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-05','19:04')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-06','07:42')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-06','11:55')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-06','12:28')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-06','17:47')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-07','07:45')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-07','11:55')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-07','12:19')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-07','17:55')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-08','07:49')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-08','11:57')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-08','12:20')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-08','18:00')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-09','07:46')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-09','11:54')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-09','12:14')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-09','16:39')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-12','07:53')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-12','11:57')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-12','12:29')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-12','17:50')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-13','07:40')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-13','12:07')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-13','12:38')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-13','17:52')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-14','07:43')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-14','11:57')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-14','12:23')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-14','17:46')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-15','07:42')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-15','11:54')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-15','12:23')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-15','17:56')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-16','07:35')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-16','12:01')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-16','12:21')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-16','16:40')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-19','07:34')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-19','11:59')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-19','12:18')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-19','17:33')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-20','07:37')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-20','12:00')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-20','12:19')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-20','17:31')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-21','07:40')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-21','11:53')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-21','12:16')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-21','17:57')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-22','07:34')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-22','12:01')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-22','12:23')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-22','18:19')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-23','07:39')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-23','12:01')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-23','12:19')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-23','17:01')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-26','07:33')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-26','11:55')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-26','12:26')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-26','17:58')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-27','07:37')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-27','11:55')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-27','12:16')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-27','17:41')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-28','07:45')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-28','11:15')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-28','12:15')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-28','17:35')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-29','07:38')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-29','12:28')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-29','12:51')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-29','17:41')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-30','07:39')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-30','12:41')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-30','13:01')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-01-30','16:16')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-02-02','07:33')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-02-02','11:52')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-02-02','12:23')");
        obj.execute("INSERT INTO wpoint(date,time)VALUES('2015-02-02','16:15')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-03','07:40')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-03','11:54')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-03','12:19')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-03','16:37')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-04','07:32')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-04','11:52')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-04','12:19')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-04','16:08')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-05','07:46')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-05','11:55')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-05','12:16')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-05','16:21')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-06','07:46')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-06','11:49')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-06','12:09')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-06','16:14')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-09','07:34')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-09','11:52')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-09','12:27')");
        obj.execute("INSERT INTO wpoint(date,time)values('2015-02-09','16:04')");
    }
}


