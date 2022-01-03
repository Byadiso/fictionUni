<?php 

/*
    Plugin Name: Our Test Plugin
    Description: A truly amazing  plugin. 
    Version: 1.0
    Author: Desire
    Author URI: https://nganatech.com
    Text Domain: wcpdomain
    Domain Path: /languages 
    
    */

    class WordCountAndTimePlugin{

        function __construct(){
            add_action('admin_menu', array($this, 'adminPage'));
            add_action('admin_init', array($this, 'settings'));
            add_filter('the_content', array($this, 'ifWrap'));
            add_action('init', array($this, 'languages'));
        }

        function languages(){
            load_plugin_textdomain('wcpdomain','false',dirname(plugin_basename(__FILE__)) . '/languages');
        }

        function ifWrap($content){
            if(is_main_query() AND is_single() AND (get_option('wcp_wordcount','1') OR get_option('wcp_charactercount','1') OR get_option('wcp_readtime','1'))){
                return $this -> createHTML($content); 
            }
            return $content
        }

        function createHTML($content){
            $html = '<h3>' . esc_html(get_option('wcp_headline', 'Post statistic')). '</h3><p>';

            //get the word count because both wordcount and read time will need it.

            if(get_option('wcp_wordcount','1') OR 'wcp_readtime','1')){
                $wordcount = str_word_count(strip_tags($content));
            }
    // for word counts
            if(get_option('wcp_wordcount','1')){
                $html .=esc_html__('This post has', 'wcpdomain') . " " . $wordcount . " " . __( 'words', 'wcpdomain') . '.<br>';
            }
    // for character count
            if(get_option('wcp_charactercount','1')){
                $html .='This post has' . strlen(strip_tags($content)) . ' characters. <br>';
            }

            // for readtime
            if(get_option('wcp_readtime','1')){
                $html .='This post will take about' . round($wordcount / 225) . ' minute(s) to read. <br>';
            }

            $html .='</p>';

            if(get_option('wcp_location','0') == '0'){
                return $html . $content;
            }
            return $content . $html;
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
                <option value="1" <?php selexcted(get_option('wcp_location'),'1') ?>>End of post</option>
            </select>

        <?php }

        function headlineHTML(){ ?>
             <input type="text" name='wcp_headline' value="<?php echo esc_attr(get_option('wcp_headline')))?>">
        <?php }

        function checkBoxHTML($args){ ?>
            <input type="checkbox" name='<?php echo $args['theName'] ?>' value='1' <?php checked(get_option($args['theName'] ),'1')?>>
        <?php }



        function adminPage(){
            add_options_page('word count settings', __('Word Count', 'wcpdomain'),'manage_options', 'word-count-settings-page', array($this, 'ourHTML'))
       
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

  

  

