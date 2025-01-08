<?php
// Récupérer toutes les images de la bibliothèque de médias
$args = array(
    'post_type'      => 'attachment',
    'posts_per_page' => -1, // Obtenez toutes les images
    'post_mime_type' => 'image',
    'post_status'    => 'inherit'
);

// Exécuter la requête pour récupérer les images
$images = get_posts($args);

// Créer un tableau pour stocker les images filtrées
$images_filtrees = array();

// Filtrer les images dont le nom correspond à "nathalie-0" à "nathalie-15"
foreach ($images as $image) {
    // Récupérer le nom du fichier de l'image (sans le chemin)
    $filename = basename($image->guid);

    // Vérifier si le nom du fichier correspond au format "nathalie-0", "nathalie-1", ..., "nathalie-15"
    if (preg_match('/^nathalie-(0|1[0-5])\.jpg$/', $filename)) {
        $images_filtrees[] = $image; // Ajouter l'image au tableau filtré
    }
}

// Si des images sont trouvées après filtrage
if (!empty($images_filtrees)) {
    // Sélectionner une image aléatoire parmi les images filtrées
    $image_aleatoire = $images_filtrees[array_rand($images_filtrees)];

    // Obtenir l'URL de l'image
    $image_url = wp_get_attachment_url($image_aleatoire->ID);

    // Afficher l'image avec un balisage HTML
    echo '<div class="hero-header">';
    echo '<img src="' . esc_url($image_url) . '" alt="Image aléatoire" style="max-width: 100%; height: auto;">';
    echo '</div>';
}
?>
