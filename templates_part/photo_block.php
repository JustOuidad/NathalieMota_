<?php
/**
 * Template Name: Photo Block
 */

get_header();

if (isset($_GET['photo_id'])) {
    $photo_id = intval($_GET['photo_id']);
    $photo = get_post($photo_id);

    if ($photo) {
        $image_url = get_the_post_thumbnail_url($photo_id, 'full');
        $reference = get_field('reference', $photo_id);
        $category = get_field('categorie', $photo_id);
        ?>
        <div class="photo-block">
            <img src="<?= esc_url($image_url) ?>" alt="<?= esc_attr($photo->post_title) ?>" />
            <div class="photo-info">
                <p>Référence: <?= esc_html($reference) ?></p>
                <p>Catégorie: <?= esc_html($category) ?></p>
            </div>
        </div>
        <?php
    } else {
        echo '<p>Photo non trouvée.</p>';
    }
} else {
    echo '<p>Aucune photo sélectionnée.</p>';
}

get_footer();