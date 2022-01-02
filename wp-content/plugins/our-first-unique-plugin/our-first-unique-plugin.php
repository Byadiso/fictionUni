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
            add_action('admin_init', array($this, 'settings'));
        }


        function settings(){
            add_settings_section('wcp_first_section', null, null, 'word-count-settings-page');

            add_settings_field('wcp_location','Display Location', array($this,'locationHTML'), 'word-count-settings-page', 'wcp_first_section');
            register_settings('wordcountplugin','wcp_location', array('sanitize_callback'=>array($this, 'sanitizeLocation'), 'default'=>'0'))
            
            // for headline            
            add_settings_field('wcp_headline','Headline text', array($this,'headlineHTML'), 'word-count-settings-page', 'wcp_first_section');
            register_settings('wordcountplugin','wcp_headline', array('sanitize_callback'=>'sanitize_text_field', 'default'=>'Post statistics'))

            // for wordcount            
            add_settings_field('wcp_wordcount','word count', array($this,'checkBoxHTML'), 'word-count-settings-page', 'wcp_first_section',array('theName' =>'wcp_wordcount'));
            register_settings('wordcountplugin','wcp_wordcount', array('sanitize_callback'=>'sanitize_text_field', 'default'=>'1'))

             // for charactercount            
             add_settings_field('wcp_charactercount','character count', array($this,'checkBoxHTML'), 'word-count-settings-page', 'wcp_first_section',array('theName' =>'wcp_charactercount'));
             register_settings('wordcountplugin','wcp_charactercount', array('sanitize_callback'=>'sanitize_text_field', 'default'=>'1'))

                          // for readtimecount            
            add_settings_field('wcp_readtime','Read time', array($this,'checkBoxHTML'), 'word-count-settings-page', 'wcp_first_section',array('theName' =>'wcp_readtime'));
            register_settings('wordcountplugin','wcp_readtime', array('sanitize_callback'=>'sanitize_text_field', 'default'=>'1'))
        }


        function sanitizeLocation($input){
            if($input != '0' AND $input != '1'){
                add_settings_error('wcp_location','wcp_location_error','display location must be either beginning or ending');
                return get_option('wcp_location')
            }
            return $input;
        }
        
        function locationHTML(){ ?>
            <select name="wcp_location">
                <option value="0" <?php selected(get_option('wcp_location'),'0') ?>>Beginning of post</option>
                <option value="1" <?php selected(get_option('wcp_location'),'1') ?>>End of post</option>
            </select>

        <?php }

        function headlineHTML(){ ?>
             <input type="text" name='wcp_headline' value="<?php echo esc_attr(get_option('wcp_headline')))?>">
        <?php }

        function checkBoxHTML($args){ ?>
            <input type="checkbox" name='<?php echo $args['theName'] ?>' value='1' <?php checked(get_option($args['theName'] ),'1')?>>
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

  

  

