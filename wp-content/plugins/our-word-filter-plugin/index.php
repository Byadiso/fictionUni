<?php 

/*
    Plugin Name: Our word filter  Plugin
    Description: Replace a list of words. 
    Version: 1.0
    Author: Desire
    Author URI: https://nganatech.com
    Text Domain: wcpdomain
    Domain Path: /languages 
    
    */


    if(! defined('ABSPATH')) exit ; //exit if accessed directly.


    class OurWordFilterPlugin{

        function __construct(){
            add_action('admin_menu', array($this, 'ourMenu'));
            add_action('admin_init', array($this, 'settings'));
        }

        function ourMenu(){
            add_options_page('word to Filter','Word filter','manage_options','ourwordfilter', array($this, 'wordFilterPage'), 'dashicons-smiley',100);
            add_submenu_page('ourwordfilter','word to filter','Word lists','manage_options','ourwordfilter',array($this, 'wordFilterPage'));
            add_submenu_page('ourwordfilter','word filter options','Options','manage_options','word-filter-options',array($this, 'optionsSubPage'));
        }


        function ourwordfilter(){ ?>


    <?php
        }

        function optionsSubPage(){ ?>


            <?php
                }
    }
    

$ourWordFilterPlugin = new OurWordFilterPlugin();

  

