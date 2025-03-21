<?php
/*
Template Name: Single Photo Template
Template Post Type: photo
Description: Template pour afficher les photographies
*/

get_header(); ?>
<?php get_template_part('templates_part/lightbox'); ?>
<script src="<?= get_template_directory_uri(); ?>/assets/js/lightbox.js"></script>
<main id="site-content" role="main">
    <section id="photo-page">
        <div class="photo-display-wrapper">
            <?php
            if (have_posts()) :
                while (have_posts()) : the_post();
                    // Récupérer les champs ACF
                    $reference = get_field('reference');
                    $categorie = get_field('categorie');
                    $format = get_field('format');
                    $type = get_field('type');
                    $annee = get_field('annee'); // Récupère l'année via ACF
                    $photo_image = get_the_post_thumbnail_url(get_the_ID(), 'full');
            ?>

            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <div class="text-area-block">
                    <h2 class="entry-meta__title-h1"><?php the_title(); ?></h2>
                    <div class="text-area-block__details">
                        <!-- Afficher les champs ACF -->
                        <p class="photo-labels">Référence: <?php echo esc_html($reference); ?></p>
                        <p class="photo-labels">Catégorie: <?php echo esc_html($categorie); ?></p>
                        <p class="photo-labels">Format: <?php echo esc_html($format); ?></p>
                        <p class="photo-labels">Type: <?php echo esc_html($type); ?></p>
                        <p class="photo-labels">Année: 
                            <?php
                            if ($annee) {
                                // Si le champ ACF est une date au format YYYY-MM-DD
                                if (strlen($annee) > 4) {
                                    echo esc_html(date('Y', strtotime($annee)));
                                } else {
                                    echo esc_html($annee);
                                }
                            } else {
                                // Fallback : utilise la date de publication du post
                                echo esc_html(get_the_date('Y'));
                            }
                            ?>
                        </p>
                    </div>
                </div>
                <div class="custom-line"></div> 
            </article>

            <article class="photo-display">
                <img src="<?php echo esc_url($photo_image); ?>" alt="<?php the_title(); ?>" />
            </article>

            <?php
                endwhile;
            endif;
            ?>
        </div>
        <div class="left-contact">
            <div class="photo-contact-button">
                <p>Cette photo vous intéresse ?</p>
                <button id="openContactModal" data-reference="<?php echo esc_attr($reference); ?>">Contact</button>
            </div>
        </div>

        <div id="modal-contact" class="modal" style="display:none;">
            <div class="modal__content">
                <?php echo do_shortcode('[contact-form-7 id="98f838c" title="Formulaire de contact 1"]'); ?>
                <span class="close-modal">&times;</span>
            </div>
        </div>

        <?php
        // Récupérer l'ID de la photo active
        $active_photo_id = get_the_ID();

        // Récupérer l'URL de la photo principale (photo_block)
        $main_photo_url = get_the_post_thumbnail_url($active_photo_id, 'medium');

        // Récupérer l'ID, l'URL et le permalien de la photo précédente
        $previous_photo = get_adjacent_post(false, '', true); // Photo précédente
        $previous_photo_id = $previous_photo ? $previous_photo->ID : null;
        $previous_photo_url = $previous_photo ? get_the_post_thumbnail_url($previous_photo_id, 'medium') : '';
        $previous_photo_permalink = $previous_photo ? get_permalink($previous_photo_id) : '';

        // Récupérer l'ID, l'URL et le permalien de la photo suivante
        $next_photo = get_adjacent_post(false, '', false); // Photo suivante
        $next_photo_id = $next_photo ? $next_photo->ID : null;
        $next_photo_url = $next_photo ? get_the_post_thumbnail_url($next_photo_id, 'medium') : '';
        $next_photo_permalink = $next_photo ? get_permalink($next_photo_id) : '';
        ?>

        <div class="right-contact">
            <!-- Conteneur pour afficher la photo principale par défaut et les miniatures au survol -->
            <div class="photo-container">
                <img id="main-photo" src="<?php echo esc_url($main_photo_url); ?>" alt="<?php the_title(); ?>" />
            </div>
            
            <!-- Flèches de navigation avec images -->
            <div class="navigation-arrows">
                <button id="prev-photo" data-photo-id="<?php echo esc_attr($previous_photo_id); ?>" data-thumbnail-url="<?php echo esc_url($previous_photo_url); ?>" data-permalink="<?php echo esc_url($previous_photo_permalink); ?>">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/image/Line6.png" alt="Flèche gauche" />
                </button>
                <button id="next-photo" data-photo-id="<?php echo esc_attr($next_photo_id); ?>" data-thumbnail-url="<?php echo esc_url($next_photo_url); ?>" data-permalink="<?php echo esc_url($next_photo_permalink); ?>">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/image/Line7.png" alt="Flèche droite" />
                </button>
            </div>
            
        </div>
    </section>
</main>
<?php
// Récupérer l'ID de la photo principale
$photo_block_id = get_the_ID();

// Récupérer la catégorie de la photo principale
$main_category = get_field('categorie', $photo_block_id);

// Requête pour récupérer les photos liées (même catégorie)
$related_photos = new WP_Query(array(
    'post_type' => 'photo',
    'posts_per_page' => 2, // On veut seulement 2 photos
    'meta_key' => 'categorie', // Champ ACF pour la catégorie
    'meta_value' => $main_category, // Filtrer par la catégorie de la photo principale
    'post__not_in' => array($photo_block_id), // Exclure la photo principale
    'orderby' => 'date',
    'order' => 'ASC',
));

if ($related_photos->have_posts()) :
    echo '<div class="related-photo-grid">';
    while ($related_photos->have_posts()) :
        $related_photos->the_post();
        $image_url = get_the_post_thumbnail_url(get_the_ID(), 'full');
        $photo_id = get_the_ID();
        $reference = get_field('reference', $photo_id);
        $category = get_field('categorie', $photo_id);
        $photo_title = get_the_title();

        if ($image_url && $photo_id && $reference && $category && $photo_title) :
            ?>
            <div class="related-photo-item" 
                 data-photo-id="<?= esc_attr($photo_id); ?>" 
                 data-image-url="<?= esc_url($image_url); ?>" 
                 data-reference="<?= esc_attr($reference); ?>" 
                 data-category="<?= esc_attr($category); ?>"
                 data-title="<?= esc_attr($photo_title); ?>"
                 data-permalink="<?= esc_url(get_permalink($photo_id)); ?>"> <!-- Ajout de data-permalink -->
                <span>
                    <img src="<?= esc_url($image_url) ?>" alt="<?= esc_attr(get_the_title()) ?>" />
                    <div class="picture-overlay">
                        <img class="eye-icon" src="<?= get_stylesheet_directory_uri() . '/assets/image/icon-eye.svg' ?>" alt="Voir l'image" />
                        <img class="icon-lightbox" src="<?= get_stylesheet_directory_uri() . '/assets/image/icon-full.png' ?>" alt="Voir l'image" />
                        <div class="overlay-info">
                            <span class="photo-title"><?= esc_html($photo_title); ?></span>
                            <span class="photo-category"><?= esc_html($category); ?></span>
                        </div>
                    </div>
                </span>
            </div>
            <?php
        endif;
    endwhile;
    echo '</div>'; // Fermeture de la galerie liée
    wp_reset_postdata();
else :
    echo '<p>Aucune photo liée trouvée.</p>';
endif;
?>

<?php get_footer(); ?>