
<?php 

    get_header();

    while(have_posts()){
            the_post();
            pageBanner();
              ?> 

                    >

                <div class="container container--narrow page-section">
                        
                    <div class="metabox metabox--position-up metabox--with-home-link">
                                <p><a class="metabox__blog-home-link" href="<?php echo get_post_type_archive('event');?>"><i class="fa fa-home" aria-hidden="true"></i> Events Home</a><span class="metabox__main">Posted by <?php the_author_posts_link(); ?> on <?php the_time('n.j.y'); ?> in <?php echo get_the_category_list(', '); ?></span></p>
                    </div>
                    <div class="generic-content">
                        <?php the_content(); ?>
                    </div>


                    <?php 
                    
                        $relatedPrograms= get_field("related_programs");

                        if($relatedPrograms){

                            echo '<hr class="section--break">';
                            echo '<h2 class="headline healine--medium">Related Program(s)</h2>';
                            echo '<ul class="link-list min-list">';
                                foreach($relatedPrograms as $program){ ?>
                                <li><a href="<?php echo get_the_permalink($program); ?>"><?php  echo get_the_title($program); ?></a></li>
    
    
                        <?php }
                            echo "</ul>";
                         }
                                         
                        ?>
                </div>


         
            
     
        <?php }

    get_footer();

?>

