
<?php  

if(!is_user_logged_in()){
  wp_redirect(esc_url(site_url('/')));
  exit;
}

get_header(); 
while(have_posts()){
  the_post();
  pageBanner();
  ?>

}



<div class="container container--narrow page-section">
    <div class='create-note'>
      <h2 class="headline  headline--medium">Create a new note</h2>
      <input class="new-note-title" placeholder="Title">
      <textarea class="new-note-body" placeholder="Your note here..."> </textarea>
      <span class="submit-note">Create Note</span>
    </div>

 <ul class="min-list link-list" id="my-notes">
<?php 
 

 
while ($userNotes -> have_posts()) {
  $userNotes -> the_post(); ?>

            <li data-id="<?php the_ID(); ?>">
                      <?php 

                      if($theParent){
                          $findChildrenOf  = $theParent;
                      } else {
                          $findChildrenOf = get_the_ID();
                      }
                      
                      wp_list_pages(array(
                              "title_li" => NULL,
                              "child_of" => $findChildrenOf,
                              'sort_column' => 'menu_order'
                          ));                    
                      ?>

            </li>

<?php }
 
 </ul>


  ?>

  
</div>


<?php get_footer();

?>

