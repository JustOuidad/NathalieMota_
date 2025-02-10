<?php
/**
 * Template for displaying individual photo information
 */

get_header(); 

// Vérifiez si un ID de photo est passé dans l'URL
if (isset($_GET['photo_id']) && is_numeric($photo_id = get_query_var('photo_id');
)) {
    $photo_id = $_GET['photo_id'];
} else {
    // Redirection ou affichage d'un message si l'ID est manquant
    wp_redirect(home_url()); 
    exit;
}

// Récupérer les détails de la photo
$image_url = get_the_post_thumbnail_url($photo_id, 'full');
$title = get_the_title($photo_id);
$reference = get_field('reference', $photo_id); // Référence via ACF
$categorie = get_field('categorie', $photo_id); // Catégorie via ACF
$date_prise_vue = get_field('date_prise_vue', $photo_id); // Date de prise de vue via ACF
$format = get_field('format', $photo_id); // Format via ACF

// Récupérer les photos dans la même catégorie
$args = array(
    'post_type' => 'photo',
    'posts_per_page' => 2, // Afficher 2 photos
    'post__not_in' => array($photo_id), // Exclure la photo actuelle
    'tax_query' => array(
        array(
            'taxonomy' => 'categorie', // Taxonomie utilisée pour les catégories
            'field' => 'slug',
            'terms' => $categorie, // Même catégorie
        ),
    ),
);
$related_photos = new WP_Query($args);
?>

<div id="photo-block" style="display: flex; flex-direction: column; height: 100vh;">
    <!-- Bloc principal 50% gauche avec infos -->
    <div style="flex: 1; display: flex; flex-direction: row; justify-content: space-between;">
        <div style="flex: 0.5; padding: 20px;">
            <h2><?= esc_html($title); ?></h2>
            <p><strong>Référence:</strong> <?= esc_html($reference); ?></p>
            <p><strong>Catégorie:</strong> <?= esc_html($categorie); ?></p>
            <p><strong>Format:</strong> <?= esc_html($format); ?></p>
            <p><strong>Date de prise de vue:</strong> <?= esc_html($date_prise_vue); ?></p>
        </div>
        
        <!-- Bloc 50% à droite avec la photo -->
        <div style="flex: 0.5; padding: 20px;">
            <img src="<?= esc_url($image_url); ?>" alt="<?= esc_attr($title); ?>" style="max-width: 100%; height: auto;">
        </div>
    </div>

    <!-- Bloc 118px en dessous -->
    <div style="height: 118px; display: flex; justify-content: space-between; padding: 10px;">
        <!-- Lien contact à gauche -->
        <div>
            <a href="#contact-form" id="contact-link" class="btn">Contactez-moi</a>
        </div>

        <!-- Navigation des photos à droite -->
        <div style="display: flex;">
            <?php
            // Liens précédent et suivant
            $prev_post = get_previous_post();
            $next_post = get_next_post();
            
        $prev_post = get_adjacent_post(false, '', true, 'photo');
        $next_post = get_adjacent_post(false, '', false, 'photo');
?>
        </div>
    </div>

    <!-- Photos similaires en bas -->
    <div style="display: flex; justify-content: space-between; padding: 20px;">
        <?php if ($related_photos->have_posts()) : ?>
            <?php while ($related_photos->have_posts()) : $related_photos->the_post(); ?>
                <div class="photo-item">
                    <img src="<?= get_the_post_thumbnail_url(get_the_ID(), 'medium'); ?>" alt="<?= esc_attr(get_the_title()); ?>" />
                    <div class="photo-overlay">
                        <img class="eye-icon" src="<?= get_stylesheet_directory_uri() . '/assets/image/icon-eye.svg' ?>" alt="Voir l'image" />
                        <img class="fullscreen-icon" src="<?= get_stylesheet_directory_uri() . '/assets/image/icon-fullscreen.svg' ?>" alt="Plein écran" />
                    </div>
                </div>
            <?php endwhile; ?>
        <?php endif; ?>
        <?php wp_reset_postdata(); ?>
    </div>
</div>
<?if (!$photo_id || !get_post($photo_id)) {
    wp_redirect(home_url());
    exit;
}
?>

<?php get_footer(); ?>

