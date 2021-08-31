
<?php  

get_header(); 
pageBanner(array(
    'title'=>'Our Program',
    'subtitle'=>'Weclome to our program'

));
?>

<div class="container container--narrow page-section">
   <div class="acf-map">
    <?php 
            while (have_posts()) {
            the_post(); 
            $mapLocation=get_field('map_location'); ?>    
            <div class="marker" data-lat="<?php $mapLocation['lat']?>" data-lng="<?php $mapLocation['lng']?>">
                <!-- <li>
                    <a href="<?php the_permalink(); ?>"><?php the_title(); 
                        $mapLocation=get_field('map_location'); ?>
                    </a>
                </li> -->
            </div>    
                   
            <?php }

            echo paginate_links();      
        ?>

</div>    

</div>


<?php get_footer();

?>

