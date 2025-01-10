<?php
// Récupérer l'image de la miniature associée au post
$photo_affiche = get_the_post_thumbnail(get_the_ID(), 'medium');

// Récupération des champs ACF associés à la photo
$reference_photo = get_field('réference');  // Exemple : champ 'réference' de ACF
$annee_photo = get_field('année');
$format_photo = get_field('format');
$categorie_photo = get_field('categorie');

// Lien vers la page du post de la photo
$titre_post = get_the_title();
$titre_slug = sanitize_title($titre_post);
$lien_post = get_site_url() . '/Photo/' . $titre_slug;

// Récupérer les termes associés à la taxonomie 'photo_champs'
$categories = get_the_terms(get_the_ID(), 'photo_champs');
if ($categories && !is_wp_error($categories)) {
    $noms_categories = array();
    foreach ($categories as $categorie) {
        $noms_categories[] = $categorie->name;  // Nom de la catégorie
    }
    $liste_categories = join(', ', $noms_categories);
}

// Récupérer l'image en plein format
$photo_post_full = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'full');
?>

<div class="block">
    <div class="block__photo">
        <?= $photo_affiche; ?>
    </div>
    <div class="blockSurvol">
        <div class="blockSurvol__overlay">
            <!-- Bouton lightbox pour afficher l'image en plein écran -->
            <button class="blockSurvol__iconLightbox" type="button" aria-label="ouvrir une lightbox sur la photo : <?php the_title(); ?>" data-full-image="<?= $photo_post_full[0]; ?>">
                <img src="<?= get_stylesheet_directory_uri() . '/assets/image/icon-lightbox.svg' ?>" alt="lightbox" />
            </button>
            <!-- Lien vers la page de la photo -->
            <a class="blockSurvol__iconEye" href="<?= $lien_post; ?>" aria-label="obtenir les infos de la photo : <?php the_title(); ?>">
                <img id="icon-eye" src="<?= get_stylesheet_directory_uri() . '/assets/image/icon-eye.svg' ?>" alt="Afficher les infos de la photo" />
            </a>
            <!-- Affichage des informations supplémentaires sur la photo -->
            <div class="blockSurvol__infos">
                <div class="blockSurvol__infos--Ref" aria-label="référence de la photo : <?php the_title(); ?>">
                    <p><?= $reference_photo ?></p>
                </div>
                <div class="blockSurvol__infos--Categorie" aria-label="catégorie de la photo : <?php the_title(); ?>">
                    <p><?= $liste_categories ?></p>
                </div>
            </div>
        </div>
    </div>    
</div>
