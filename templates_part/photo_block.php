<?php
/**
 * Template for displaying individual photo information
 */

get_header();

// Vérifiez si un ID de photo est passé dans l'URL
if (isset($_GET['photo_id']) && is_numeric($_GET['photo_id'])) {
    $photo_id = intval($_GET['photo_id']);
} else {
    // Redirection si l'ID est manquant
    wp_redirect(home_url());
    exit;
}

// Récupérer les détails de la photo
$photo = get_post($photo_id);
if (!$photo) {
    wp_redirect(home_url());
    exit;
}

$image_url = get_the_post_thumbnail_url($photo_id, 'full');
$title = get_the_title($photo_id);
$reference = get_field('reference', $photo_id); // Référence via ACF
$categorie = get_field('categorie', $photo_id); // Catégorie via ACF
$date_prise_vue = get_field('date_prise_vue', $photo_id); // Date de prise de vue via ACF
$format = get_field('format', $photo_id); // Format via ACF

// Afficher les détails de la photo
?>
<div id="photo-block" class="photo-block">
    <div class="photo-block__info">
        <h2><?= esc_html($title); ?></h2>
        <p><strong>Référence:</strong> <?= esc_html($reference); ?></p>
        <p><strong>Catégorie:</strong> <?= esc_html($categorie); ?></p>
        <p><strong>Format:</strong> <?= esc_html($format); ?></p>
        <p><strong>Date de prise de vue:</strong> <?= esc_html($date_prise_vue); ?></p>
    </div>
    <div class="photo-block__image">
        <img src="<?= esc_url($image_url); ?>" alt="<?= esc_attr($title); ?>" />
    </div>
</div>
<?php
get_footer();
?>