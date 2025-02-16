<?php
/**
 * The main template file
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

get_header(); ?>

<div id="content">

    <!-- Inclure le widget hero-header -->
    <?php get_template_part('templates_part/hero-header'); ?>

    <!-- Inclure le filtre -->
    <?php get_template_part('templates_part/filter-part'); ?>

    <!-- Inclure la lightbox -->
    <?php get_template_part('templates_part/lightbox'); ?>

    <!-- Affichage des photos -->
    <?php
    // Définir le nombre de photos par page et récupérer la page actuelle
    $photos_per_page = 8;
    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

    // Requête pour récupérer les photos depuis le champ ACF photo_showdown
    $photos_showdown = new WP_Query(array(
        'post_type' => 'photo',  // Type de publication personnalisé
        'posts_per_page' => $photos_per_page,  // Nombre de photos par page
        'paged' => $paged,  // Page courante
        'orderby' => 'rand',  // Afficher les photos aléatoirement
    ));

    // Vérifie si des posts ont été trouvés
    if ($photos_showdown->have_posts()) :
        echo '<div class="photo-grid">';
        while ($photos_showdown->have_posts()) :
            $photos_showdown->the_post();
            $image_url = get_the_post_thumbnail_url(get_the_ID(), 'full'); // URL de l'image
            $photo_id = get_the_ID(); // ID de la photo
            $reference = get_field('reference', $photo_id); // Récupérer la référence via ACF
            $category = get_field('categorie', $photo_id); // Récupérer la catégorie via ACF
            ?>
            <div class="photo-item" 
                 data-photo-id="<?= esc_attr($photo_id); ?>" 
                 data-image-url="<?= esc_url($image_url); ?>" 
                 data-reference="<?= esc_attr($reference); ?>" 
                 data-category="<?= esc_attr($category); ?>">
                <span>
                    <img src="<?= esc_url($image_url) ?>" alt="<?= esc_attr(get_the_title()) ?>" />
                    <div class="photo-overlay">
                        <img class="eye-icon" src="<?= get_stylesheet_directory_uri() . '/assets/image/icon-eye.svg' ?>" alt="Voir l'image" />
                    </div>
                </span>
            </div>
        <?php
        endwhile;
        echo '</div>'; // Fermeture de la galerie

        // Pagination : Afficher le bouton "Afficher plus"
        $total_pages = $photos_showdown->max_num_pages;
        if ($paged < $total_pages) {
            echo '<button id="load-more" class="btn-load-more">Charger plus</button>';
        }

        // Réinitialiser les données de post
        wp_reset_postdata();
    else :
        // Message affiché si aucun post n'a été trouvé
        echo '<p>Aucune photo trouvée.</p>';
    endif;
    ?>

</div>

<?php get_footer(); ?> 