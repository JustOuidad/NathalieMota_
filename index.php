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
</div>
<?

// Initialisation de la tax_query pour les filtres (si vous voulez filtrer par catégorie)
$tax_query = array('relation' => 'AND');

// Filtre pour la taxonomie 'photo_champs' (vous pouvez ajouter des conditions pour d'autres taxonomies)
if (!empty($_GET['Photo'])) {
    $tax_query[] = array(
        'taxonomy' => 'Photo',  
        'field'    => 'id',            
        'terms'    => $_GET['photo champs'], 
        'operator' => 'IN',
    );
}

// Définition de la requête WP_Query pour récupérer les photos
$photos_showdown = new WP_Query(array(
    'post_type'      => 'Photo',
    'posts_per_page' => 8,
    'orderby'        => 'date',
    'order'          => 'ASC',
    'paged'          => 1,
    'tax_query'      => $tax_query,  
));

// Vérification si des posts ont été trouvés
if ($photos_showdown->have_posts()) {
    while ($photos_showdown->have_posts()) {
        $photos_showdown->the_post();
        // Inclure le template partiel pour chaque photo
        get_template_part('template_parts/block_photo');
    }
    wp_reset_postdata();  
} else {
    echo 'Aucune photo avec les filtres sélectionnés';
}
?>

<!-- Section pour le bouton "Charger plus" -->
<div class="bouton-front">
    <div id="total-photos-count"></div>
    <button id="charger-plus" class="btn-chargerPlus">Charger plus</button>
</div>

<?php get_footer(); ?>
