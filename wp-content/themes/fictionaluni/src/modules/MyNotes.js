import $ from 'jquery';


class MyNotes{
    constructor(){
        this.events();

    }
    events(){
        $(".delete-note").on('click', this.deleteNote);
        $(".edit-note").on('click', this.editNote.bind(this));
        $(".update-note").on('click', this.updateNote.bind(this));
        $(".submit-note").on('click', this.createNote.bind(this));

    }
    // functions or methods
  deleteNote(e){
      var thisNoteId= $(e.target).parents('li').data('id')
      $.ajax({
          beforeSend:(xhr)=>{
            xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
          },
          url:universityData.root_url + '/wp-json/wp/v2/note/' + thisNoteId,
          type:'DELETE',
          success: (response) => {
              console.log('Yes we made it');
              console.log(response);
              if(response.userCount < 5){
                $('.note-limit-message').removeClass('active');
              }

          },
          error: (error)=>{
            console.log('No brother try again');
            console.log(error)
          },
      })

 }
 
//  editNote function

 editNote(e){
  var thisNote= $(e.target).parents('li');
  if(thisNote.data("state") == "editable"){
      this.makeNoteReadOnly(thisNote);
  } else{
  this.makeNoteEditable(thisNote);
  }
}

updateNote (e){
  var thisNote = $(e.target).parents('li').data('id');
  var thisNoteId = thisNote.data('id');

  var ourUpdatedPost = {
    "title": thisNote.find('.note-title-field').val(),
    "content": thisNote.find('.note-body-field').val()
  }

  $.ajax({
      beforeSend:(xhr)=>{
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url:universityData.root_url + '/wp-json/wp/v2/note/' + thisNoteId,
      type:'POST',
      data: ourUpdatedPost ,
      success: (response) => {
        this.makeNoteReadOnly(thisNote);
          console.log('Yes we made it');
          console.log(response)

      },
      error: (error)=>{
        console.log('No brother try again');
        console.log(error)
      },
  })

}

//create note 

createNote (e){
 
  var ourNewPost = {
    "title": $('.new-note-title').val(),
    "content":  $('.new-note-body').val(),
    "status":'publish'
  }

  $.ajax({
      beforeSend:(xhr)=>{
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url:universityData.root_url + '/wp-json/wp/v2/note/',
      type:'POST',
      data: ourNewPost ,
      success: (response) => {
        $('.new-note-title', '.new-note-body').val('');
        $('<li>Imagine yes <li>').prependTo('#my-notes').hide().slideDown()
          console.log('Yes we made it');
          console.log(response)

      },
      error: (response)=>{
        if(response.responseText == 'You have reached your note limit.'){
          $('.note-limit-message').addClass('active');

        }
        console.log(response);
        console.log("sorry")

      }
      
  })

}


//make a text editable()
makeNoteEditable(thisNote){
  thisNote.find('.edit-note').html('<i class="fa fa-times" aria-hidden="true"></i>Cancel');
  thisNote.find('.note-title-field, .note-body-field').removeAttr('readonly').addClass("note-active-field");
  thisNote.find('.update-note').addClass("update-note--visible");
  thisNote.data('state', 'editable');
}

//make a note readOnly
makeNoteReadOnly(thisNote){
  thisNote.find('.edit-note').html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit');
  thisNote.find('.note-title-field, .note-body-field').attr('readonly', 'readonly').removeClass("note-active-field");
  thisNote.find('.update-note').removeClass("update-note--visible");
  thisNote.data('state', 'cancel');

}




}

export default MyNotes; 