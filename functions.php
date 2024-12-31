<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// Fonction pour enregistrer les menus
function register_my_menus() {
    // Enregistre le menu principal et le menu footer
    register_nav_menus( array(
        'Menu' => __( 'Menu Principal' ),   
        'footer_menu' => __( 'Menu Footer' )
    ) );
}

// Ajouter l'action pour enregistrer les menus
add_action( 'after_setup_theme', 'register_my_menus' );

// Fonction pour enqueuer le style du thème enfant
function child_theme_configurator_css() {
    wp_enqueue_style( 'chld_thm_cfg_child', get_stylesheet_uri(), array( 'twenty-twenty-one-style' ) ); 
}
add_action( 'wp_enqueue_scripts', 'child_theme_configurator_css', 10 );

// Enqueue des polices personnalisées
function enqueue_custom_fonts() {
    echo '<style type="text/css">
        @font-face {
            font-family: "Space Mono";
            src: url("' . get_stylesheet_directory_uri() . '/assets/fonts/SpaceMono-Regular.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
        }
        @font-face {
            font-family: "Space Mono";
            src: url("' . get_stylesheet_directory_uri() . '/assets/fonts/SpaceMono-Italic.ttf") format("truetype");
            font-weight: normal;
            font-style: italic;
        }
        @font-face {
            font-family: "Space Mono";
            src: url("' . get_stylesheet_directory_uri() . '/assets/fonts/SpaceMono-Bold.ttf") format("truetype");
            font-weight: bold;
            font-style: normal;
        }
        @font-face {
            font-family: "Space Mono";
            src: url("' . get_stylesheet_directory_uri() . '/assets/fonts/SpaceMono-BoldItalic.ttf") format("truetype");
            font-weight: bold;
            font-style: italic;
        }
    </style>';
}
add_action( 'wp_head', 'enqueue_custom_fonts' );

// Enqueue du script du modal
function enqueue_modal_script() {
    wp_enqueue_script( 'modal-script', get_stylesheet_directory_uri() . '/js/script.js', array(), null, true );
}
add_action( 'wp_enqueue_scripts', 'enqueue_modal_script' );

?>
