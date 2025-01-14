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
function create_formats_taxonomy() {
    register_taxonomy(
        'formats',    // Nom de la taxonomie
        'photo',      // Type de publication
        array(
            'label' => 'Formats',     // Label pour la taxonomie
            'hierarchical' => true,   // Détermine si la taxonomie est hiérarchique (comme les catégories)
            'show_in_rest' => true,   // Activer pour Gutenberg
            'rewrite' => array(      // URL friendly
                'slug' => 'formats',
            ),
        )
    );
}
add_action( 'init', 'create_formats_taxonomy' );
// Enregistrer la taxonomie "formats" pour le type de publication "photo"


function create_custom_post_type() {
    register_post_type('Photo', array(
        'labels' => array(
            'name' => 'Photos',
            'singular_name' => 'Photo',
        ),
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'Photo'), // Important pour que l'URL soit bien "/Photo/"
        'supports' => array('title', 'editor', 'thumbnail'), // Active les miniatures
        'taxonomies' => array('photo_champs'), // Associe la taxonomie 'photo_champs'
    ));
}
add_action('init', 'create_custom_post_type');

function create_photo_taxonomy() {
    register_taxonomy('photo_champs', 'Photo', array(
        'labels' => array(
            'name' => 'Champs de Photo',
            'singular_name' => 'Champ de Photo',
        ),
        'hierarchical' => true,
        'public' => true,
        'rewrite' => array('slug' => 'photo_champs'),
    ));
}
add_action('init', 'create_photo_taxonomy');

function load_more_photos() {
    $paged = isset($_POST['paged']) ? $_POST['paged'] : 1;

    // Requête pour récupérer les photos
    $photos_per_page = 8;
    $photos_showdown = new WP_Query(array(
        'post_type' => 'Photo',
        'posts_per_page' => $photos_per_page,
        'paged' => $paged,
    ));

    if ($photos_showdown->have_posts()) :
        while ($photos_showdown->have_posts()) :
            $photos_showdown->the_post();
            ?>
            <div class="photo-item">
                <?php echo get_the_post_thumbnail(get_the_ID(), 'full'); ?>
            </div>
            <?php
        endwhile;
    endif;

    wp_reset_postdata();
    die();
}

add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');
