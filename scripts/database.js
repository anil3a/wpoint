var Database = function(){
    
    obj = this;
    
    this.db = window.openDatabase('Database','1.0','Teste db',5 * 1024 * 1024);
    
    
    this.execute = function(strsql,sucesso){
        if(typeof sucesso != 'function') sucesso = function(){};
        
        this.db.transaction(function(tx){
            tx.executeSql(strsql);
        },function(err){
            console.error('Ocorreu um erro na string(' + strsql + ')');
            console.log(err);
        },sucesso);
    }
    
    
    this.select = function(strsql,func){
        if(typeof func != 'function') func = function(tx,results){ console.log(results); }
        this.db.transaction(function(tx){
            tx.executeSql(strsql,[],func);
        });
    }  
    
    this.checkOn = function(sucesso){
        obj.execute('INSERT INTO wpoint(date,time)values("' + $('.date-time .date').val() + '","' + $('.date-time .time').val() + '")',sucesso);
    }
}