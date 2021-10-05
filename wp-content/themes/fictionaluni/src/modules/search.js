import $ from 'jquery';


class Search {
    //describe and crete/initiate our object
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
        $.getJSON( universityData.root_url + '/wp-json/university/v2/search?term=' + this.searchField.val(), (results)=>{
            this.resultsDiv.html(`
            <div class="row">
                <div class="one-third">
                    <h2 class="search-overlay__section-title">General Information</h2>  
                    ${results.generalInfo.length ? '<ul class="link-list min-list">' : '<p> No general information</p>'}
                    ${results.generalInfo.map(item =>`
                        <li>
                                <a href="${item.permalink}"> ${item.title} </a>${item.type =='post' ? `by ${item.authorName}` :'' }
                        </li>`
                    )};
            
                    ${results.generalInfo.length ? '</ul>' : ''};
                </div>
                <div class="one-third">
                    <h2 class="search-overlay__section-title">Events</h2>  
                    ${results.events.length ? '<ul class="link-list min-list">' : `<p> No Events match your research. <a href="${universityData.root_url}/events">View all events</a></p>`}
                    ${results.events.map(item =>`
                    <div class="event-summary">
                        <a class="event-summary__date t-center" href="${item.permalink}">
                        <span class="event-summary__month">${item.month}</span>
                        <span class="event-summary__day">${item.day}</span>
                        </a>
                        <div class="event-summary__content">
                        <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                        <p>${item.description}<a href="${item.permalink}" class="nu gray">Learn more</a></p>
                        </div>
                     </div>`
                    ).join('')};
            
                    ${results.events.length ? '</ul>' : ''};
                </div>
                <div class="one-third">
                    <h2 class="search-overlay__section-title">Programs</h2>  
                    ${results.programs.length ? '<ul class="link-list min-list">' : `<p> No program match that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}
                    ${results.programs.map(item =>`
                        <li>
                                <a href="${item.permalink}"> ${item.title} </a>${item.type =='post' ? `by ${item.authorName}` :'' }
                        </li>`
                    ).join(' ')};
            
                    ${results.programs.length ? '</ul>' : ''};
                </div>
                <div class="one-third">
                    <h2 class="search-overlay__section-title">Professors</h2>  
                    ${results.professors.length ? '<ul class="professor-cards">' : `<p> No professor match that search.</p>`}
                    ${results.professors.map(item =>`
                    <li class="professor-card__list-item">
                            
                    <a class="professor-card" href="${item.permalink}">

                        <img class="professor-card__image" scr="${item.imageUrl}">
                        <span class="professor-card__name">${item.title}</span>                                     
                    
                                                    
                    </a>
                </li>    
                    `
                    ).join(' ')};
            
                    ${results.professors.length ? '</ul>' : ''}
                    
                </div>
                <div class="one-third">
                    <h2 class="search-overlay__section-title">Campuses</h2>  
                    ${results.campuses.length ? '<ul class="link-list min-list">' : `<p> No general information</p><a href="${item.permalink}">View all campuses</a>`}
                    ${results.campuses.map(item =>`
                        <li>
                                <a href="${item.permalink}"> ${item.title} </a>${item.type =='post' ? `by ${item.authorName}` :'' }
                        </li>`
                    )};
            
                    ${results.campuses.length ? '</ul>' : ''};
                </div>
            </div>
           
         `);

        
    
       
        // $.when(
        //     $.getJSON( universityData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchTerm),
        //     $.getJSON( universityData.root_url + '/wp-json/wp/v2/page?search=' + this.searchTerm)
        // ).then((posts,pages)=>{
        //     var combinedResults = posts[0].concat(pages[0]);
        //     this.resultsDiv.html(`
        //     <h2 class="search-overlay__section-title">General Information</h2>  
        //     ${combinedResults.length ? '<ul class="link-list min-list">' : '<p> No general information</p>'}
        //      ${combinedResults.map(item =>`
        //         <li>
        //                  <a href="${item.link}"> ${item.title.rendered} </a>${item.type =='post' ? `by ${item.authorName}` :'' }
        //         </li>`
        //      )};

        //     ${posts.length ? '</ul>' : ''};
        //  `);
   
        this.isSpinnerVisible = false; 
    }) 
      , ()=>{ 
          this.resultsDiv.html('<p>Unexpected error; please try again. </p>');
      };
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