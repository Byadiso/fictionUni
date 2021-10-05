<?php 

    function university_post_types(){

          //events post type 
        register_post_type('event', array(
            'capabiity_type' => 'event',
            'map_meta_cap' => true,
            'show_in_rest' => true,
            'supports'=> array('title','editor','excerpt'),
            'rewrite' => array('slug' => 'events'),
            'has_archive'=> true,
            "public" => true,
            'labels' =>array(
                'name' =>'Events',
                'add_new_item' => 'Add New Event',
                'edit_item' => 'Edit Event',
                'all_item' => 'All Events',
                'singular_name'=> 'Event'
            
            ),
            'menu_icon' => 'dashicons-calendar'
            ));   

            // program post type 
            register_post_type('program', array(
                'show_in_rest' => true,
                'supports'=> array('title','editor'),
                'rewrite' => array('slug' => 'programs'),
                'has_archive'=> true,
                "public" => true,
                'labels' =>array(
                    'name' =>'Programs',
                    'add_new_item' => 'Add New Program',
                    'edit_item' => 'Edit Program',
                    'all_item' => 'All Programs',
                    'singular_name'=> 'Program'
                
                ),
                'menu_icon' => 'dashicons-awards'
                ));


                 // professor post type 
               register_post_type('professor', array(
                'show_in_rest' => true,
                'supports'=> array('title','editor','thumbnail'),
                'public' => true,
                'labels' =>array(
                    'name' =>'Professor',
                    'add_new_item' => 'Add New Professor',
                    'edit_item' => 'Edit Professor',
                    'all_item' => 'All Professors',
                    'singular_name'=> 'Professor'
                
                ),
                'menu_icon' => 'dashicons-welcome-learn-more'
                ));



          //campus post type 
          register_post_type('campus', array(
            'show_in_rest' => true,
            'supports'=> array('title','editor','excerpt'),
            'rewrite' => array('slug' => 'campuses'),
            'has_archive'=> true,
            "public" => true,
            'labels' =>array(
                'name' =>'Campuses',
                'add_new_item' => 'Add New Campus',
                'edit_item' => 'Edit Campus',
                'all_item' => 'All Campus',
                'singular_name'=> 'Campus'
            
            ),
            'menu_icon' => 'dashicons-location-alt'
            ));  

            
          //Note post type 
          register_post_type('note', array(
            'show_in_rest' => true,
            'supports'=> array('title','editor'),
            'public' => false,
            'show_ui' =>true,
            'labels' =>array(
                'name' =>'Notes',
                'add_new_item' => 'Add New Note',
                'edit_item' => 'Edit Note',
                'all_item' => 'All Note',
                'singular_name'=> 'Note'
            
            ),
            'menu_icon' => 'dashicons-welcome-write-blog'
            )); 


        }
        add_action("init", "university_post_types");



?>