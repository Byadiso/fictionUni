import $ from 'jquery';


class Search {
    //escribe and crete/initiate our object
    constructor(){
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
                this.typingTimer = setTimeout(this.getResults.bind(this),2000);
            }else {
                this.resultsDiv.html('');
                this.isSpinnerVisible = false ;
            }
           
        }
        
        this.previousValue = this.searchTerm.val();
    }

    getResults(){
       $.getJSON(universityData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchTerm.val(), posts => {
     
       this.resultsDiv.html(`
        <h2 class="search-overlay__seaction-title">General Information</h2>
  
        ${posts.length ? '<ul class="link-list min-list">' : '<p>No general infor</p>'}
         ${posts.map(item =>`
            <li>
                     <a href="${item.link}">${item.title.rendered}</a>
            </li>`
         )}
            
       ${posts.length ? '</ul>' : ''} 
        `);
        this.isSpinnerVisible = false;
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
        this.isOVerlayOpen =true;
    }
    closeOverlay(){
        this.searchOverlay.removeClass('search-overlay--active');
        $('body').removeClass('body-no-scroll');
        this.isOVerlayOpen = false;
    }
    
    
}

export default Search; 