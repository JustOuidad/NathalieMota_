<?php
// Exit if accessed directly
if (!defined('ABSPATH')) exit;

// ====================================
// 1. Enregistrement des menus
// ====================================
function register_my_menus() {
    register_nav_menus(array(
        'Menu' => __('Menu Principal'),
        'footer_menu' => __('Menu Footer'),
    ));
}
add_action('after_setup_theme', 'register_my_menus');

// ====================================
// 2. Gestion des styles et scripts
// ====================================
function theme_enqueue_styles_and_scripts() {
    // Enqueue le style du thème enfant
    wp_enqueue_style('chld_thm_cfg_child', get_stylesheet_uri(), array('twenty-twenty-one-style'));

    // Enqueue les polices personnalisées
    wp_enqueue_style('theme-fonts', get_template_directory_uri() . '/style.css', array(), '1.0', 'all');

    // Désenregistrer le script du dark mode
    wp_dequeue_script('twentytwentyone-dark-mode-toggler');
    wp_deregister_script('twentytwentyone-dark-mode-toggler');

    // Enqueue jQuery depuis un CDN
    wp_deregister_script('jquery');
    wp_register_script('jquery', 'https://code.jquery.com/jquery-3.6.0.min.js', false, null, true);
    wp_enqueue_script('jquery');

    // Enqueue le script JavaScript personnalisé
    wp_enqueue_script(
        'custom-script',
        get_stylesheet_directory_uri() . '/js/script.js',
        array('jquery'),
        null,
        true
    );

    // Localisation des données pour AJAX
    wp_localize_script(
        'custom-script',
        'ajax_params',
        array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'paged' => 1
        )
    );

    // Enqueue le script lightbox
    wp_enqueue_script(
        'lightbox-script',
        get_stylesheet_directory_uri() . '/js/lightbox.js',
        array('jquery'),
        null,
        true
    );

    // Localisation des données pour lightbox AJAX
    wp_localize_script(
        'lightbox-script',
        'lightbox_ajax_object',
        array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'security' => wp_create_nonce('lightbox_nonce')
        )
    );
}
add_action('wp_enqueue_scripts', 'theme_enqueue_styles_and_scripts');

// ====================================
// 3. Gestion des templates
// ====================================
function utiliser_index_comme_home($template) {
    if (is_front_page()) {
        $custom_template = locate_template('index.php'); // Utilise index.php comme template
        if ($custom_template) {
            return $custom_template;
        }
    }
    return $template;
}
add_filter('template_include', 'utiliser_index_comme_home');

// ====================================
// 4. Taxonomies et types de contenu
// ====================================
function create_formats_taxonomy() {
    register_taxonomy(
        'formats',
        'photo',
        array(
            'label' => 'Formats',
            'hierarchical' => true,
            'show_in_rest' => true,
            'rewrite' => array('slug' => 'formats'),
        )
    );
}
add_action('init', 'create_formats_taxonomy');

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

// ====================================
// 5. Fonctionnalités AJAX
// ====================================
function charger_photos_via_ajax() {
    // Récupérer les paramètres AJAX
    $categorie = isset($_POST['categorie']) ? sanitize_text_field($_POST['categorie']) : '';
    $format = isset($_POST['format']) ? sanitize_text_field($_POST['format']) : '';
    $order = isset($_POST['order']) ? sanitize_text_field($_POST['order']) : 'ASC';
    $page = isset($_POST['page']) ? intval($_POST['page']) : 1;

    // Arguments de la requête WP_Query
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 8,
        'paged' => $page,
        'orderby' => 'date',
        'order' => $order,
    );

    if (!empty($categorie)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'categorie',
            'field' => 'slug',
            'terms' => $categorie,
        );
    }

    if (!empty($format)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'formats',
            'field' => 'slug',
            'terms' => $format,
        );
    }

    $photos_query = new WP_Query($args);

    if ($photos_query->have_posts()) :
        while ($photos_query->have_posts()) : $photos_query->the_post();
            $image_url = get_the_post_thumbnail_url(get_the_ID(), 'full');
            $photo_id = get_the_ID();
            $reference = get_field('reference', $photo_id);
            $category = get_field('categorie', $photo_id);
            $photo_title = get_the_title();
            ?>
            <div class="photos-items"  
                 data-photo-id="<?= esc_attr($photo_id); ?>" 
                 data-image-url="<?= esc_url($image_url); ?>" 
                 data-reference="<?= esc_attr($reference); ?>" 
                 data-category="<?= esc_attr($category); ?>"
                 data-title="<?= esc_attr($photo_title); ?>">
                <span>
                    <img src="<?= esc_url($image_url) ?>" alt="<?= esc_attr(get_the_title()) ?>" />
                    <div class="picture-overlay">
                        <img class="eye-icon" src="<?= get_stylesheet_directory_uri() . '/assets/image/icon-eye.svg' ?>" alt="Voir l'image" />
                        <div class="overlay-info">
                            <span class="photo-title"><?= esc_html($photo_title); ?></span>
                            <span class="photo-category"><?= esc_html($category); ?></span>
                        </div>
                    </div>
                </span>
            </div>
            <?php
        endwhile;
    else :
        echo 'Aucune photo trouvée.';
    endif;

    wp_die();
}
add_action('wp_ajax_charger_photos_via_ajax', 'charger_photos_via_ajax');
add_action('wp_ajax_nopriv_charger_photos_via_ajax', 'charger_photos_via_ajax');

// ====================================
// 6. Réécriture d'URL et gestion des query vars
// ====================================
function custom_photo_rewrite_rule() {
    add_rewrite_rule(
        '^photo/([0-9]+)/?$',
        'index.php?photo_id=$matches[1]',
        'top'
    );
}
add_action('init', 'custom_photo_rewrite_rule');

function custom_photo_query_vars($vars) {
    $vars[] = 'photo_id';
    return $vars;
}
add_filter('query_vars', 'custom_photo_query_vars');

// ====================================
// 7. Styles et scripts spécifiques aux templates
// ====================================
function enqueue_photo_block_styles() {
    if (is_page_template('photo_block.php')) {
        wp_enqueue_style('photo-block-style', get_stylesheet_directory_uri() . '/css/photo-block.css');
        wp_enqueue_script('photo-block-script', get_stylesheet_directory_uri() . 'js/photo-block.js', array('jquery'), null, true);
    }
}
add_action('wp_enqueue_scripts', 'enqueue_photo_block_styles');