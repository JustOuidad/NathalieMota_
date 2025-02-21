<?php
/*
Template Name: Photo Block
*/

get_header();

// Récupérer l'ID de la photo depuis l'URL
$photo_id = isset($_GET['photo_id']) ? intval($_GET['photo_id']) : 0;

if ($photo_id) {
    // Récupérer les informations de la photo
    $photo_title = get_the_title($photo_id);
    $photo_reference = get_field('reference', $photo_id);
    $photo_category = get_the_terms($photo_id, 'categorie')[0]->name;
    $photo_format = get_the_terms($photo_id, 'formats')[0]->name;
    $photo_date = get_the_date('d/m/Y', $photo_id);
    $photo_image = get_the_post_thumbnail_url($photo_id, 'full');

    // Récupérer les photos précédente et suivante
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => -1,
        'orderby' => 'date',
        'order' => 'ASC',
    );
    $all_photos = get_posts($args);
    $current_index = array_search($photo_id, array_column($all_photos, 'ID'));
    $prev_photo = $all_photos[$current_index - 1] ?? null;
    $next_photo = $all_photos[$current_index + 1] ?? null;

    // Récupérer les photos apparentées (même catégorie)
    $related_args = array(
        'post_type' => 'photo',
        'posts_per_page' => 2,
        'post__not_in' => array($photo_id),
        'tax_query' => array(
            array(
                'taxonomy' => 'categorie',
                'field' => 'term_id',
                'terms' => get_the_terms($photo_id, 'categorie')[0]->term_id,
            ),
        ),
    );
    $related_photos = get_posts($related_args);
    ?>

    <div class="photo-block-container">
        <!-- Bloc 50 % de largeur à gauche : Informations de la photo -->
        <div class="photo-info">
            <h1><?php echo esc_html($photo_title); ?></h1>
            <p><strong>Référence :</strong> <?php echo esc_html($photo_reference); ?></p>
            <p><strong>Catégorie :</strong> <?php echo esc_html($photo_category); ?></p>
            <p><strong>Format :</strong> <?php echo esc_html($photo_format); ?></p>
            <p><strong>Date :</strong> <?php echo esc_html($photo_date); ?></p>
        </div>

        <!-- Bloc 50 % de largeur à droite : Photo en grand format -->
        <div class="photo-image">
            <img src="<?php echo esc_url($photo_image); ?>" alt="<?php echo esc_attr($photo_title); ?>">
        </div>

        <!-- Bloc 118 px de hauteur en dessous : Interactions -->
        <div class="photo-interactions">
            <!-- Lien de contact -->
            <div class="contact-link">
                <a href="#modal-contact" class="open-modal" data-reference="<?php echo esc_attr($photo_reference); ?>">
                    Contact
                </a>
            </div>

            <!-- Navigation entre les photos -->
            <div class="photo-navigation">
                <?php if ($prev_photo) : ?>
                    <a href="<?php echo get_permalink($prev_photo->ID); ?>" class="prev-photo" data-thumbnail="<?php echo get_the_post_thumbnail_url($prev_photo->ID, 'thumbnail'); ?>">
                        &larr; Précédente
                    </a>
                <?php endif; ?>

                <?php if ($next_photo) : ?>
                    <a href="<?php echo get_permalink($next_photo->ID); ?>" class="next-photo" data-thumbnail="<?php echo get_the_post_thumbnail_url($next_photo->ID, 'thumbnail'); ?>">
                        Suivante &rarr;
                    </a>
                <?php endif; ?>
            </div>
        </div>

        <!-- Photos apparentées -->
        <div class="related-photos">
            <h2>Vous aimerez aussi</h2>
            <div class="related-grid">
                <?php foreach ($related_photos as $related_photo) : ?>
                    <div class="related-photo-item">
                        <a href="<?php echo get_permalink($related_photo->ID); ?>">
                            <?php echo get_the_post_thumbnail($related_photo->ID, 'medium'); ?>
                            <div class="photo-hover-icons">
                                <span class="eye-icon">👁️</span>
                                <span class="fullscreen-icon">🔍</span>
                            </div>
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <?php
} else {
    echo '<p>Aucune photo trouvée.</p>';
}

get_footer();
?>