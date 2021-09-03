import $ from 'jquery';


class Search {
    //escribe and crete/initiate our object
    constructor(){
        this.addSearchHTML();
        this.openButton = $('.js-search-trigger');
        this.closeButton = $('.search-overlay__close');
        this.searchOverlay = $('.search-overlay');
        this.events();
        this.isOVerlayOpen = false;
        this.isSpinnerVisible = false;
        this.searchTerm = $('#search-term');
        this.previousValue
        this.typingTimer ;
        this.resultsDiv = $('#search-overlay__results');
    }
    //events
    events(){
        this.openButton.on('click',this.openOverlay.bind(this));
        this.closeButton.on('click',this.closeOverlay.bind(this));
        $(document).on('keydown',this.keyPressDispatcher.bind(this));
        this.searchTerm.on('keyup', this.typingLogic.bind(this));
        
    }

    //methods/functions
    typingLogic(){

        if(this.searchTerm.val() != this.previousValue.val()){
            clearTimeout(this.typingTimer);

            if(this.searchTerm.val()){
                if(!this.isSpinnerVisible){
                    this.resultsDiv.html("<div class='spinner-loader'></div>");
                    this.isSpinnerVisible = true;
                }       
                this.typingTimer = setTimeout(this.getResults.bind(this),750);
            }else {
                this.resultsDiv.html('');
                this.isSpinnerVisible = false ;
            }
           
        }
        
        this.previousValue = this.searchTerm.val();
    }

    getResults(){
        $.when(
            $.getJSON( universityData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchTerm),
            $.getJSON( universityData.root_url + '/wp-json/wp/v2/page?search=' + this.searchTerm)
        ).then((posts,pages)=>{
            var combinedResults = posts.concat(pages);
            this.resultsDiv.html(`
            <h2 class="search-overlay__section-title">General Information</h2>  
            ${combinedResults.length ? '<ul class="link-list min-list">' : '<p> No general information</p>'}
             ${combinedResults.map(item =>`
                <li>
                         <a href="${item.link}"> ${item.title.rendered} </a> 
                </li>`
             )}

            ${posts.length ? '</ul>' : ''} 
                `);
        this.isSpinnerVisible = false;      
      });
    };
     

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