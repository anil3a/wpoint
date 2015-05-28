/**
* MAIN WINDOW WPOINT PROJECT
* here you need just to put the objects that will show on the app.
* every event and function need to be created inside their objects
*/
jQuery(document).ready(function($){
    
    //Creation of Database
    db = new Database();
    ld = new Loading();
    ld.open();
    var currentObj; //Variable used to set which object is current activated;
    
    //Creation of GeneralReport Object
    generalReport = new GeneralReport(db);
    
    
    //Creation of DateTime Object
    menu = new Menu();
    
        
    //Creation of DateTime Object  
    dateTime = new DateTime(db);
    dateTime.create(function(){
        currentObj = this;
        
            
        menu.create('WPOINT',function(){
            menu.rightAction = function(){dateTime.load()};
            main = menu.addMenuLeft('mainPage','Main Page');
            general = menu.addMenuLeft('generalReport','General Report');
            //matchList = menu.addMenuLeft('matchList','Generate Values');
            

            
            general.bind('click',function(e){
                currentObj.remove();
                menu.header.find('.refresh').hide();
                menu.closeAnimation(100);
                currentObj = generalReport.create();
            });

            main.bind('click',function(e){
                currentObj.remove();
                menu.header.find('.refresh').show();
                menu.closeAnimation(100);
                currentObj = dateTime.create();
            });
            
            /*matchList.bind('click',function(e){
                if(confirm('Are you sure you want to reset your database?')){
                    resetDB(db);
                    alert('Database reseted successfully');
                }
            });*/
            
            ld.close();
        });
        
        
    });    
           
});