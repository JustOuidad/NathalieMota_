<?php
// Requête photo format paysage aléatoire avec ACF (Champ personnalisé 'format' dans 'photo champs')
$args_hero = array(
    'post_type' => 'photo',  
    'posts_per_page' => 1,   
    'orderby' => 'rand',     
    'post_status' => 'publish', 
    'meta_query' => array(
        array(
            'key' => 'format',   
            'value' => 'paysage',  
            'compare' => '=',     
        ),
    ),
);

// Créer la requête avec les arguments modifiés
$banner = new WP_Query($args_hero);

if ($banner->have_posts()) {
    while ($banner->have_posts()) {
        $banner->the_post();
        // Affichage de l'image avec la classe CSS 'hero-image'
        echo '<div class="hero-image">';
        the_post_thumbnail('large');  
        echo '</div>';
    }
    wp_reset_postdata();
} else {
    echo '<p>Aucune photo trouvée.</p>';
}
?>

<!-- Conteneur pour le texte -->
<div class="hero-text">
    <h1>Photographe Event</h1>
</div>
