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

//Desenregistrer le dark mode

function dequeue_dark_mode_toggler_script() {
    // Vérifiez si le script est enregistré/en file d'attente
    wp_dequeue_script('twentytwentyone-dark-mode-toggler');
    wp_deregister_script('twentytwentyone-dark-mode-toggler');
}
add_action('wp_enqueue_scripts', 'dequeue_dark_mode_toggler_script', 20);


// Enqueue les polices personnalisées
function enqueue_custom_fonts() {
    wp_enqueue_style('theme-fonts', get_template_directory_uri() . '/style.css', array(), '1.0', 'all');
}
add_action('wp_enqueue_scripts', 'enqueue_custom_fonts');

// Enqueue jQuery depuis CDN
function charger_jquery_avec_cdn() {
    // Annuler l'enregistrement de jQuery local
    wp_deregister_script('jquery');

    // Enregistrer jQuery depuis un CDN
    wp_register_script('jquery', 'https://code.jquery.com/jquery-3.6.0.min.js', false, null, true);

    // Enqueue jQuery à partir du CDN
    wp_enqueue_script('jquery');
}
add_action('wp_enqueue_scripts', 'charger_jquery_avec_cdn', 1); // Le 1 assure qu'il est en file d'attente avant les autres scripts.

// Enqueue le script JavaScript et jQuery
function charger_jquery_et_scripts() {
    // Charger jQuery à partir du CDN
    wp_enqueue_script('jquery');

    // Ajouter ton script personnalisé après jQuery
    wp_enqueue_script(
        'custom-script', 
        get_stylesheet_directory_uri() . '/js/script.js', // Ton fichier script.js
        array('jquery'), // Dépendance à jQuery
        null, 
        true // Charger dans le footer pour éviter les conflits
    );

    // Passer des variables PHP à JavaScript
    wp_localize_script(
        'custom-script', 
        'ajax_params', 
        array(
            'ajaxurl' => admin_url('admin-ajax.php'), 
            'paged' => 1
        )
    );
}
add_action('wp_enqueue_scripts', 'charger_jquery_et_scripts');

// Page d'accueil
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

// Taxonomie 
function create_formats_taxonomy() {
    register_taxonomy(
        'formats',    
        'photo',      
        array(
            'label' => 'Formats',    
            'hierarchical' => true,   
            'show_in_rest' => true,  
            'rewrite' => array(     
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
        'rewrite' => array('slug' => 'Photo'), 
        'supports' => array('title', 'editor', 'thumbnail'),
        'taxonomies' => array('photo_champs'), 
    ));
}
add_action('init', 'create_custom_post_type');

// Intégration AJAX url
function charger_photos_via_ajax() {
    $categorie = isset($_POST['categorie']) ? sanitize_text_field($_POST['categorie']) : '';
    $format = isset($_POST['format']) ? sanitize_text_field($_POST['format']) : '';
    $order = isset($_POST['order']) ? sanitize_text_field($_POST['order']) : 'ASC';
    $page = isset($_POST['page']) ? intval($_POST['page']) : 1;

    $args = array(
        'post_type' => 'photo', // Remplacez par votre type de contenu (exemple : 'post', 'photo', etc.)
        'posts_per_page' => 8, // Nombre de photos par page
        'paged' => $page,
        'orderby' => 'date',
        'order' => $order,
    );

    // Si une catégorie est filtrée
    if (!empty($categorie)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'categorie', // Remplacez par votre taxonomie
            'field' => 'slug',
            'terms' => $categorie,
        );
    }

    // Si un format est filtré
    if (!empty($format)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'format', // Remplacez par votre taxonomie
            'field' => 'slug',
            'terms' => $format,
        );
    }

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            echo '<div class="photo-item">';
            // echo '<h3>' . get_the_title() . '</h3>';
            echo get_the_post_thumbnail(get_the_ID(), 'medium'); // Affiche la miniature
            echo '</div>';
        }
    } else {
        echo '<div id="no-more-posts">Aucune photo supplémentaire.</div>';
    }

    wp_die(); // Arrêter proprement l'exécution
}
add_action('wp_ajax_filter', 'charger_photos_via_ajax'); // Pour utilisateurs connectés
add_action('wp_ajax_nopriv_filter', 'charger_photos_via_ajax'); // Pour utilisateurs non connectés

// Fonction pour afficher que wp_enqueue_scripts fonctionne
add_action('wp_enqueue_scripts', function() {
    echo '<!-- wp_enqueue_scripts fonctionne -->';
});
