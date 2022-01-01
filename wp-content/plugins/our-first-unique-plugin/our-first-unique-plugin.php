<?php 


/*
    Plugin Name: Our Test Plugin
    Description: A truly amazing  plugin. 
    Version: 1.0
    Author: Desire
    Author URI: https://nganatech.com
    
    */

    class WordCountAndTimePlugin{

        function __construct(){
            add_action('admin_menu', array($this, 'adminPage'));
        }


        function settings(){
            add_settings_section('wcp_first_section', null, null, 'word-count-settings-page');
            add_settings_field('wcp_location','Display Location', array($this,'locationHTML'), 'word-count-settings-page', 'wcp_first_section');
            register_settings('wordcountplugin','wcp_location', array('sanitize_callback'=>'sanitize_text_field', 'default'=>'0'))
        }

        function locationHTML(){ ?>
            <select name="wcp_location">
                <option value="0">Beginning of post</option>
                <option value="1">End of post</option>
            </select>

        <?php }

        function adminPage(){
            add_options_page('word count settings', 'word count','manage_options', 'word-count-settings-page', array($this, 'ourHTML'))
       
           }
           function ourHTML(){ ?>
                <div class="wrap">
                    <h1>Word Count Settings</h1>
                    <form action="options.php" method="POST"></form>
                    <?php
                        settings_fields('wordcountplugin');
                        do_settings_sections('word-count-setings-page');
                        submit_button();

                    ?>
                </div>
             
           <?php }
    }


    $wordCountAndTimePlugin = new WordCountAndTimePlugin();

  

  

