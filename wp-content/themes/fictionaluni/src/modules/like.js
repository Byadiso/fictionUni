import $ from 'jquery';


class Like {
    //describe and create/initiate our object
    constructor(){        
        this.events();
      
    }
    //events
    events(){
       
        $(".like-box").on('click',this.ourClickDispatcher.bind(this));    
        
    }

    //methods/functions
    ourClickDispatcher(e){
        var currentLikeBox= $(e.target).closest(".like-box");

        if(currentLikeBox.data("exists") == 'yes'){
            this.deletedLike(currentLikeBox);
            
        } else{
            this.createLike(currentLikeBox);
        }
                
    }

    createLike(currentLikeBox){
        $.ajax({
            beforeSend:(xhr)=>{
                xhr.setRequestHeader("X-WP-NONCE", universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/university/v1/manageLike',
            type: 'POST',
            data:{'professorId': currentLikeBox.data('professor')},
            success:(response) =>{
                currentLikeBox.attr('data-exists', 'yes');
                var likeCount = parseInt(currentLikeBox.find('.like-count').html(), 10);

                likeCount++ ; 
                currentLikeBox.find(".like-count").html(likeCount);
                console.log(response);
            },
            error: (response) =>{
                console.log(response);
            }
        });

    }

    deletedLike(currentLikeBox){
        $.ajax({
            beforeSend:(xhr)=>{
                xhr.setRequestHeader("X-WP-NONCE", universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/university/v1/manageLike',
            type: 'DELETE',
            data:{'like': currentLikeBox.attr('data-like')},
            success:(response) =>{
                currentLikeBox.attr('data-exists', 'yes');
                var likeCount = parseInt(currentLikeBox.find('.like-count').html(), 10);

                likeCount-- ; 
                currentLikeBox.find(".like-count").html(likeCount);
                console.log(response);
            },
            error: (response) =>{
                console.log(response);
            }
        });
    }

    
    keyPressDispatcher(e){
        if(e.keyCode == 83 && !this.isOVerlayOpen && !$('input, textarea').is(':focus')){
            this.openOverlay();
        }
        if(e.keyCode == 27  && this.isOVerlayOpen ){
            this.closeOverlay();
        }
    }

    openOverlay(){
        this.searchOverlay.addClass('search-overlay--active');
        $('body').addClass('body-no-scroll');
        this.searchTerm.val('');
        setTimeout(()=> this.searchTerm.focus() , 300);      
        this.isOVerlayOpen =true;
        return false;
    }

    closeOverlay(){
        this.searchOverlay.removeClass('search-overlay--active');
        $('body').removeClass('body-no-scroll');
        this.isOVerlayOpen = false;
    }

    addSearchHTML(){

        $('body').append(`  <div class="search-overlay">
        <div class="search-overlay__top">
            <div class="container">
                <i class="fa fa-search search-verlay__icon" aria-hidden="true"></i>
                <input type="text" class='search-term' placeholder="type here what you ae looking " id="search-term">     
                <i class="fa fa-window-close search-verlay__close" aria-hidden="true"></i>
            </div>
         </div>
        <div class="container">
            <div id="search-overlay__results"></div>
        </div>
     </div>`) 


    }
    
    
}

export default Search; 