<!-- Overlay pour la lightbox -->
<div class="lightbox-overlay hidden" aria-hidden="true"></div>

<!-- Lightbox -->
<div class="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" aria-describedby="lightbox-description">
    <!-- Bouton fermer lightbox -->
    <button class="lightbox__close" aria-controls="lightbox" aria-expanded="false" aria-label="Fermer la lightbox" type="button">
        <img src="<?= get_stylesheet_directory_uri() . '/assets/image/cross-white.svg' ?>" alt="Fermer" />
    </button>

    <!-- Bouton pour naviguer l'image précédente dans la lightbox -->
    <button class="lightbox__arrows lightbox__arrows--previous" aria-controls="lightbox" aria-label="Image précédente" type="button">
        <img src="<?= get_stylesheet_directory_uri() . '/assets/image/arrow-left-white.svg' ?>" alt="Précédente" />
        <p>Précédente</p>
    </button>

    <!-- Bouton pour naviguer l'image suivante dans la lightbox -->
    <button class="lightbox__arrows lightbox__arrows--next" aria-controls="lightbox" aria-label="Image suivante" type="button">
        <p>Suivante</p>
        <img src="<?= get_stylesheet_directory_uri() . '/assets/image/arrow-right-white.svg' ?>" alt="Suivante" />
    </button>

    <!-- Conteneur pour afficher l'image sélectionnée dans la lightbox -->
    <div class="lightbox__open">
    <img src="<?= get_stylesheet_directory_uri() . '/assets/image/icon-lightbox.svg' ?>" alt="Image de la lightbox" />
    </div>

    <!-- Section pour afficher des informations sur l'image -->
    <div class="lightbox__infos">
        <p class="lightbox__infos--Ref" aria-label="Référence de la photo">Référence</p>
        <p class="lightbox__infos--Categorie" aria-label="Catégorie de la photo">Catégorie</p>
    </div>
</div>