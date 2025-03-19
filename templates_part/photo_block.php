<?php
/*
Template Name: Single Photo Template
Template Post Type: photo
Description: Template pour afficher les photographies
*/

get_header();?>

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
                </div>    <div class="custom-line"></div> <!-- Ligne noire -->
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
        <button id="openContactModal" data-reference="<?php echo esc_attr($reference); ?>">Contact</button>    </div>
</div>

<div id="modal-contact" class="modal" style="display:none;">
    <div class="modal__content">
        <?php echo do_shortcode('[contact-form-7 id="98f838c" title="Formulaire de contact 1"]'); ?>
        <span class="close-modal">&times;</span>
    </div>
</div>
<?php
// Récupérer l'ID de la photo active
$active_photo_id = get_the_ID(); // Si vous êtes sur une page de détail de photo
$active_photo_url = get_the_post_thumbnail_url($active_photo_id, 'medium'); // URL de la photo active

// Récupérer l'ID de la photo précédente et suivante
$previous_photo = get_previous_post();
$previous_photo_id = $previous_photo ? $previous_photo->ID : null;

$next_photo = get_next_post();
$next_photo_id = $next_photo ? $next_photo->ID : null;
?>

<div class="right-contact">
    <!-- Photo active -->
    <div class="photo-container">
        <img id="current-photo" src="<?php echo esc_url($active_photo_url); ?>" alt="Photo active" width="81" height="71" />
    </div>
    
      <!-- Flèches de navigation avec images -->
      <div class="navigation-arrows">
        <button id="prev-photo" data-photo-id="<?php echo esc_attr($previous_photo_id); ?>">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/image/Line6.png" alt="Flèche gauche" />
        </button>
        <button id="next-photo" data-photo-id="<?php echo esc_attr($next_photo_id); ?>">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/image/Line7.png" alt="Flèche droite" />
        </button>
    </div>
</div>
</div>
<div class="custom-line-2"></div> <!-- Ligne noire 2 -->
</article>
       <?
get_footer();