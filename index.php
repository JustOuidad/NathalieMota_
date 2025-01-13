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
// Récupérer les images du champ galerie "photo_champs"
$photos = get_field('photo_champs'); // Remplacez 'photo_champs' par le nom exact de votre champ dans ACF

if ($photos): ?>
    <div class="photo-gallery">
        <?php foreach ($photos as $photo): ?>
            <div class="photo-item">
                <!-- Affichez l'image -->
                <img src="<?php echo esc_url($photo['url']); ?>" alt="<?php echo esc_attr($photo['alt']); ?>">

                <!-- Optionnel : Ajoutez une légende si nécessaire -->
                <?php if (!empty($photo['caption'])): ?>
                    <p><?php echo esc_html($photo['caption']); ?></p>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>
<?php else: ?>
    <p>Aucune photo trouvée.</p>
<?php endif; ?>
<?php
if ($photos): ?>
    <div class="photo-gallery">
        <?php foreach ($photos as $index => $photo): ?>
            <div class="photo-item<?php echo $index >= 8 ? ' hidden' : ''; ?>">
                <img src="<?php echo esc_url($photo['url']); ?>" alt="<?php echo esc_attr($photo['alt']); ?>">
            </div>
        <?php endforeach; ?>
    </div>
    <button id="load-more">Charger Plus</button>
<?php else: ?>
    <p>Aucune photo trouvée.</p>
<?php endif; ?>


<?php get_footer(); ?>
