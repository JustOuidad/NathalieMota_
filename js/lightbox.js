jQuery(document).ready(function($) {
    let loadedPhotos = []; // Tableau pour stocker les IDs des photos chargées
    let currentIndex = 0; // Index de la photo actuellement affichée dans la lightbox

    // Ouvrir la lightbox
    $('.photo-grid').on('click', '.photos-items', function() {
        const imageUrl = $(this).data('image-url');
        const name = $(this).data('title');
        const category = $(this).data('category');
        const photoId = $(this).data('photo-id'); // ID de la photo cliquée

        // Mettre à jour l'image et les informations dans la lightbox
        $('.lightbox-image').attr('src', imageUrl);
        $('.lightbox-category').text(category);
        $('.lightbox-title').text(name);

        // Stocker l'ID de la photo actuelle et mettre à jour l'index
        currentIndex = loadedPhotos.indexOf(photoId);
        if (currentIndex === -1) {
            loadedPhotos.push(photoId); // Ajouter l'ID si pas déjà dans le tableau
            loadedPhotos.sort((a, b) => a - b); // Trier les IDs par ordre croissant
            currentIndex = loadedPhotos.indexOf(photoId); // Mettre à jour l'index après le tri
        }

        // Afficher la lightbox
        $('.lightbox-overlay, .lightbox').fadeIn();
    });

    // Fermer la lightbox
    $('.lightbox__close, .lightbox-overlay').on('click', function() {
        $('.lightbox-overlay, .lightbox').fadeOut();
    });

    // Navigation entre les images
    $('.lightbox__arrows--previous').on('click', function(e) {
        e.stopPropagation(); // Empêcher la propagation de l'événement
        navigatePhoto('prev');
    });

    $('.lightbox__arrows--next').on('click', function(e) {
        e.stopPropagation(); // Empêcher la propagation de l'événement
        navigatePhoto('next');
    });

    // Fonction pour naviguer entre les photos
    function navigatePhoto(direction) {
        if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + loadedPhotos.length) % loadedPhotos.length; // Descendant
        } else if (direction === 'next') {
            currentIndex = (currentIndex + 1) % loadedPhotos.length; // Ascendant
        }

        // Charger la photo correspondante dans la lightbox
        const targetPhotoId = loadedPhotos[currentIndex];
        loadPhotoIntoLightbox(targetPhotoId);
    }

    // Fonction pour charger une photo dans la lightbox
    function loadPhotoIntoLightbox(photoId) {
        const targetPhoto = $('.photos-items[data-photo-id="' + photoId + '"]');
        if (targetPhoto.length) {
            const imageUrl = targetPhoto.data('image-url');
            const name = targetPhoto.data('title');
            const category = targetPhoto.data('category');

            // Mettre à jour la lightbox avec la nouvelle photo
            $('.lightbox-image').attr('src', imageUrl);
            $('.lightbox-category').text(category);
            $('.lightbox-title').text(name);
        }
    }

    // Gestion du bouton "load more"
    $('.load-more').on('click', function() {
        // Simuler le chargement des photos supplémentaires (IDs 74 à 81)
        const newPhotos = [74, 75, 76, 77, 78, 79, 80, 81]; // À remplacer par votre logique AJAX
        loadedPhotos = loadedPhotos.concat(newPhotos); // Ajouter les nouveaux IDs au tableau
        loadedPhotos.sort((a, b) => a - b); // Trier les IDs par ordre croissant
    });

    // Initialisation des IDs des photos chargées (66 à 73)
    loadedPhotos = [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81]; // IDs initiaux

    // Ouvrir la page photo_block.php lorsqu'on clique sur l'image dans la lightbox
    $('.lightbox-image').on('click', function () {
        const currentPhoto = $('.photos-items[data-image-url="' + $(this).attr('src') + '"]');
        if (currentPhoto.length) {
            const photoId = currentPhoto.data('photo-id');
            if (photoId) {
                window.location.href = `Photo/${photoId}`;
            }
        }
    });

    jQuery(document).ready(function($) {
        let loadedPhotos = []; // Tableau pour stocker les URLs des photos chargées
        let currentIndex = 0; // Index de la photo actuellement affichée dans la lightbox
    
        // Ouvrir la lightbox pour related-photo-item
        $('.related-photo-grid').on('click', '.related-photo-item', function() {
            const imageUrl = $(this).data('image-url');
            const reference = $(this).data('reference');
            const category = $(this).data('category');
            const name = $(this).data('title');
            const filter = $(this).data('filter'); // Récupérer le filtre commun
    
            // Mettre à jour l'image et les informations dans la lightbox
            $('.lightbox-image').attr('src', imageUrl);
            $('.lightbox-reference').text('Référence: ' + reference);
            $('.lightbox-category').text('Catégorie: ' + category);
            $('.lightbox-title').text(name);
    
            // Charger les photos partageant le même filtre
            loadRelatedPhotos(filter);
    
            // Stocker l'URL de la photo actuelle et mettre à jour l'index
            currentIndex = loadedPhotos.indexOf(imageUrl);
            if (currentIndex === -1) {
                loadedPhotos.push(imageUrl); // Ajouter l'URL si pas déjà dans le tableau
                currentIndex = loadedPhotos.length - 1;
            }
    
            // Afficher la lightbox
            $('.lightbox-overlay, .lightbox').fadeIn();
        });
    
        // Fermer la lightbox
        $('.lightbox__close, .lightbox-overlay').on('click', function() {
            $('.lightbox-overlay, .lightbox').fadeOut();
        });
    
        // Navigation entre les images
        $('.lightbox__arrows--previous').on('click', function(e) {
            e.stopPropagation(); // Empêcher la propagation de l'événement
            navigatePhoto('prev');
        });
    
        $('.lightbox__arrows--next').on('click', function(e) {
            e.stopPropagation(); // Empêcher la propagation de l'événement
            navigatePhoto('next');
        });
    
        // Fonction pour naviguer entre les photos
        function navigatePhoto(direction) {
            if (direction === 'prev') {
                currentIndex = (currentIndex - 1 + loadedPhotos.length) % loadedPhotos.length; // Descendant
            } else if (direction === 'next') {
                currentIndex = (currentIndex + 1) % loadedPhotos.length; // Ascendant
            }
    
            // Charger la photo correspondante dans la lightbox
            const targetImageUrl = loadedPhotos[currentIndex];
            loadPhotoIntoLightbox(targetImageUrl);
        }
    
        // Fonction pour charger une photo dans la lightbox
        function loadPhotoIntoLightbox(imageUrl) {
            const targetPhoto = $('.related-photo-item[data-image-url="' + imageUrl + '"]');
            if (targetPhoto.length) {
                const reference = targetPhoto.data('reference');
                const category = targetPhoto.data('category');
                const name = targetPhoto.data('title');
    
                // Mettre à jour la lightbox avec la nouvelle photo
                $('.lightbox-image').attr('src', imageUrl);
                $('.lightbox-reference').text('Référence: ' + reference);
                $('.lightbox-category').text('Catégorie: ' + category);
                $('.lightbox-title').text(name);
            }
        }
    
        // Fonction pour charger les photos partageant le même filtre
        function loadRelatedPhotos(filter) {
            loadedPhotos = []; // Réinitialiser le tableau des photos chargées
    
            // Parcourir tous les éléments related-photo-item avec le même filtre
            $('.related-photo-item').each(function() {
                if ($(this).data('filter') === filter) {
                    loadedPhotos.push($(this).data('image-url')); // Ajouter l'URL de la photo
                }
            });
        }
    
        // Rediriger vers la page de la photo
        $('.lightbox-image').on('click', function() {
            const currentPhoto = $('.related-photo-item[data-image-url="' + $(this).attr('src') + '"]');
            if (currentPhoto.length) {
                const permalink = currentPhoto.data('permalink');
                if (permalink) {
                    window.location.href = permalink;
                } else {
                    console.error("Aucun permalien trouvé pour cette photo.");
                }
            } else {
                console.error("Photo non trouvée dans .related-photo-item.");
            }
        });
    });
});