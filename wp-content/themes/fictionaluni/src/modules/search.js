import $ from 'jquery';


class Search {
    //escribe and crete/initiate our object
    constructor(){
        this.openButton = $('.js-search-trigger');
        this.closeButton = $('.search-overlay__close');
        this.searchOverlay = $('.search-overlay');
        this.events();
        this.isOVerlayOpen = false;
        this.searchTerm = $('#search-term');
        this.typingTimer ;
    }
    //events
    events(){
        this.openButton.on('click',this.openOverlay.bind(this));
        this.closeButton.on('click',this.closeOverlay.bind(this));
        $(document).on('keyup',this.keyPressDispatcher.bind(this));
        this.searchTerm.on('keydown', this.typingLogic.bind(this));
        
    }

    //methods/functions
    typingLogic(){
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(function(){
            console.log('I am desire test')
        },2000)
    }


    keyPressDispatcher(e){
        if(e.keyCode == 83 && !this.isOVerlayOpen){
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
    
}

export default Search; 