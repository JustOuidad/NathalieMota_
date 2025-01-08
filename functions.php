<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// Fonction pour enregistrer les menus
function register_my_menus() {
    register_nav_menus( array(
        'Menu' => __( 'Menu Principal' ),
        'footer_menu' => __( 'Menu Footer' ),
    ) );
}
add_action( 'after_setup_theme', 'register_my_menus' );

// Enqueue le style du thème enfant
function child_theme_configurator_css() {
    wp_enqueue_style( 'chld_thm_cfg_child', get_stylesheet_uri(), array( 'twenty-twenty-one-style' ) );
}
add_action( 'wp_enqueue_scripts', 'child_theme_configurator_css', 10 );

// Enqueue les polices personnalisées
function enqueue_custom_fonts() {
    wp_enqueue_style('theme-fonts', get_template_directory_uri() . '/style.css', array(), '1.0', 'all');
}
add_action('wp_enqueue_scripts', 'enqueue_custom_fonts');


// Enqueue le script JavaScript
function enqueue_custom_scripts() {
    wp_enqueue_script(
        'custom-script', 
        get_stylesheet_directory_uri() . '/assets/js/script.js', 
        array(), 
        null, 
        true 
    );
}
add_action( 'wp_enqueue_scripts', 'enqueue_custom_scripts' );

add_action('wp_enqueue_scripts', function() {
    echo '<!-- wp_enqueue_scripts fonctionne -->';
});
//page d'accueil
function utiliser_single_page_comme_home( $template ) {
    if ( is_front_page() ) {
        $custom_template = locate_template( 'single-page.php' );
        if ( $custom_template ) {
            return $custom_template;
        }
    }
    return $template;
}
add_filter( 'template_include', 'utiliser_single_page_comme_home' );

//taxonomie 

function cptui_register_my_cpts() {

	/**
	 * Post Type: Catégories .
	 */

	$labels = [
		"name" => esc_html__( "Catégories ", "custom-post-type-ui" ),
		"singular_name" => esc_html__( "Catégorie", "custom-post-type-ui" ),
	];

	$args = [
		"label" => esc_html__( "Catégories ", "custom-post-type-ui" ),
		"labels" => $labels,
		"description" => "",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => true,
		"rest_base" => "",
		"rest_controller_class" => "WP_REST_Posts_Controller",
		"rest_namespace" => "wp/v2",
		"has_archive" => false,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"delete_with_user" => false,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => false,
		"can_export" => false,
		"rewrite" => [ "slug" => "categories", "with_front" => true ],
		"query_var" => true,
		"supports" => [ "title", "editor", "thumbnail" ],
		"show_in_graphql" => false,
	];

	register_post_type( "categories", $args );
}

add_action( 'init', 'cptui_register_my_cpts' );
