var Loading = function(){
    
    objLoading = this;
    
    if(!jQuery){
        console.error(utf8_decode('Não é possível criar o objeto'));
        return false;
    }  
    
    this.open = function(){
        if($('.loading').size() == 0)
            $('body').prepend('<section class="loading"></section>');
    }
    
    this.close = function(){
        $('.loading').remove();
    }
    
}