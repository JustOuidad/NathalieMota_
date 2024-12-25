<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if ( !function_exists( 'chld_thm_cfg_locale_css' ) ) :
    function chld_thm_cfg_locale_css( $uri ){
        if ( empty( $uri ) && is_rtl() && file_exists( get_template_directory() . '/rtl.css' ) )
            $uri = get_template_directory_uri() . '/rtl.css';
        return $uri;
    }
endif;
add_filter( 'locale_stylesheet_uri', 'chld_thm_cfg_locale_css' );

// Fonction pour enqueuer le style du thème enfant
if ( !function_exists( 'child_theme_configurator_css' ) ) :
    function child_theme_configurator_css() {
        wp_enqueue_style( 'chld_thm_cfg_child', get_stylesheet_uri(), array( 'twenty-twenty-one-style' ) ); // Style du thème enfant
    }
endif;
add_action( 'wp_enqueue_scripts', 'child_theme_configurator_css', 10 );
// END ENQUEUE PARENT ACTION


// Enregistrer le menu
function register_my_menu() {
    register_nav_menus( array(
        'menu' => __( 'Menu Principal', 'text-domain' ), // Ajouter un text-domain pour la traduction
    ) );
}
add_action( 'init', 'register_my_menu' );


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


// Enqueue le style du thème enfant
function child_theme_configurator_css() {
    wp_enqueue_style( 'chld_thm_cfg_child', get_stylesheet_uri(), array( 'twenty-twenty-one-style' ) ); // Style du thème enfant
}
add_action( 'wp_enqueue_scripts', 'child_theme_configurator_css', 10 );



// Créer un shortcode pour afficher les liens vers les mentions légales et la vie privée
function my_custom_footer_links() {
    // Récupère les pages par titre
    $mentions_legales = get_page_by_title( 'Mentions légales' );
    $vie_privee = get_page_by_title( 'Vie privée' );

    // Génère le HTML des liens uniquement si les pages existent
    $html = '<ul class="footer-menu">';
    if ( $mentions_legales ) {
        $html .= '<li><a href="' . esc_url( get_permalink( $mentions_legales->ID ) ) . '">Mentions légales</a></li>';
    }
    if ( $vie_privee ) {
        $html .= '<li><a href="' . esc_url( get_permalink( $vie_privee->ID ) ) . '">Vie privée</a></li>';
    }
    $html .= '</ul>';

    return $html;
}
add_shortcode( 'footer_links', 'my_custom_footer_links' );
?>

