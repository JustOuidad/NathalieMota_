<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

get_header(); ?>

<?php get_header(); ?>

<div id="content">

    <!-- Inclure le widget hero-header -->
    <?php get_template_part('templates_part/hero-header');?>


    <!-- Autres éléments de contenu -->
    <?php

// Définir le nombre de photos par page et récupérer la page actuelle
$photos_per_page = 8;
$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;

// Requête pour récupérer les photos
$photos_showdown = new WP_Query(array(
    'post_type' => 'Photo',  // Type de publication personnalisé
    'posts_per_page' => $photos_per_page,  // Nombre de photos par page
    'paged' => $paged,  // Page courante
));

if ($photos_showdown->have_posts()) :
    echo '<div class="photo-gallery">';
    while ($photos_showdown->have_posts()) :
        $photos_showdown->the_post();
        ?>
        <div class="photo-item">
            <?php echo get_the_post_thumbnail(get_the_ID(), 'full'); ?>  <!-- Affiche l'image en pleine taille -->
        </div>
        <?php
    endwhile;
    echo '</div>'; // Fermeture de la galerie

    // Pagination : Afficher le bouton "Afficher plus"
    $total_pages = $photos_showdown->max_num_pages;
    if ($paged < $total_pages) {
        echo '<button id="load-more" class="btn-load-more">Charger plus</button>';
    }

    wp_reset_postdata();
else :
    echo 'Aucune photo trouvée';
endif;
?>


<?php get_footer(); ?>
