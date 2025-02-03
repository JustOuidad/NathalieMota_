<div class="lightbox">
    <!-- Bouton fermer lightbox -->
    <button class="lightbox__close" aria-controls="lightbox" aria-expanded="false" aria-label="lightbox close" type="button">
        <img  src="<?= get_stylesheet_directory_uri() . '/assets/image/cross-white.svg' ?>"/> 
    </button>

    <!-- Bouton pour naviguer l'image précédente dans la lightbox -->
    <button class="lightbox__arrows--previous" aria-controls="lightbox" aria-label="lightbox précédente" type="button">
        <img src="<?= get_stylesheet_directory_uri() . '/assets/image/arrow-left-white.svg' ?>" alt="previous" />
        <p> Précédente</p>
    </button>

    <!-- Bouton pour naviguer l'image suivante dans la lightbox -->
    <button class="lightbox__arrows--next" aria-controls="lightbox" aria-label="lightbox suivante" type="button">
        <p> Suivante</p>
        <img src="<?= get_stylesheet_directory_uri() . '/assets/image/arrow-right-white.svg' ?>" alt="next" />
    </button>

    <!-- Conteneur pour afficher l'image sélectionnée dans la lightbox -->
    <div class="lightbox__open">
        <img class="lightbox__image" src="" alt="lightbox image"/>
    </div>

    <!-- Section pour afficher des informations sur l'image -->
    <div class="lightbox__infos">
        <p class="lightbox__infos--Ref" aria-label="référence de la photo">référence</p>
        <p class="lightbox__infos--Categorie" aria-label="catégorie de la photo">catégorie</p>
    </div>    
</div>