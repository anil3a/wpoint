var Menu = function(db){
    objMenu = this;
    this.db = db;
    this.opened = false;
    this.header;
    this.menu;
    
    animationSpeed = 200;
    
    this.openAnimation = function(time){
        if(typeof time == 'undefined') time = animationSpeed;
        $('.main-page').animate({
            left:"250px", right:"-250px"
        },time,function(){objMenu.opened = true;});
    }
    
    this.closeAnimation = function(time){
        if(typeof time == 'undefined') time = animationSpeed;
        $('.main-page').animate({
            left:"0", right:"0"
        },time,function(){objMenu.opened = false;});
    }
    
    this.create = function(title,success){
        if(typeof title == 'undefined') title = 'WPOINT';
        else if(typeof title == 'function') success = title;
        
        if(typeof success == 'undefined') success = function(){}
        
        this.success = success;
        
        if($('header').size() == 0){
            $('<div>').load('objects/Menu/Menu.html',function(){
                
                
                objMenu.header = $($(this).find('header').prependTo('.main-page'));
               
                if($('.left-menu').size() == 0) objMenu.menu = $($(this).find('.left-menu').prependTo('.main-page'));
                
                
                objMenu.setTitle(title);
                
                objMenu.header.find('.nav-right').bind('click',function(){
                    if(typeof objMenu.rightAction == 'function') objMenu.rightAction();
                });
                
                //variables to menu slider
                nextX = 0;
                
                objMenu.header.find('.nav-left.menu').bind('click',function(e){
                    if(!objMenu.opened){
                        objMenu.openAnimation();
                    }else{
                        objMenu.closeAnimation();
                    }
                    if(typeof objMenu.leftAction == 'function') objMenu.leftAction();
                });
                
                /*COMMENTED LINE
                
                IT'S NOT WORKING ANYMORE
                
                CLEAR THESE LINES WHEN THE CODE ARE PERFECT
                
                
                
                $('.main-page').bind('touchstart',function(e){
                    $('.main-page').unbind('touchmove touchend');
                    timeInit = e.originalEvent.timeStamp;
                    touches = e.originalEvent.touches;
                    if(touches.length == 1){
                        initialX = touches[0].clientX;
                        $('.main-page').bind('touchmove',function(e){
                            currentX = e.originalEvent.touches[0].clientX;
                            walkX = currentX - initialX;
                            if(objMenu.opened) currentMain = 250;
                            else currentMain = 0;
                            nextX = currentMain + walkX;
                            
                            if(nextX > 250) nextX = 250;
                            else if(nextX < -50) nextX = -50
                            
                            
                            $('.main-page').css({'left':nextX + 'px', 'right' : (-1 * nextX) + 'px'});
                        });
                         $('.main-page').bind('touchend',function(e){
                            
                            position = String($(this).css('left')).replace(/px/gi,'');
                            if(Number(position) > 125){
                                objMenu.openAnimation();
                            }else{
                                objMenu.closeAnimation();
                            }
                         });
                    }
                });
                
                
                
                */
                
                objMenu.success();
            });
        }
    }
    
    this.setTitle = function(title){
        if(typeof title == 'undefined') console.error('Undefined title');
        else{
            $('header h1').text(title);
        }
    }
    
    this.rightAction = function(){}
    
    this.leftAction = function(){}
    
    this.addMenuLeft = function(nameMenu,labelMenu){
        if(typeof nameMenu != 'string' || typeof labelMenu != 'string'){
            console.error('nameMenu and labeMenu must be strings');
            return false;
        }
        var newMenu = $('<li id="' + nameMenu + '">' + labelMenu + '</li>');
        newMenu.appendTo(objMenu.menu.find('nav ul'));
        
        return newMenu;
    }
}