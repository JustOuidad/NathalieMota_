jQuery(document).ready(function($) {
    // Ouvrir la lightbox
    $('.photo-grid').on('click', '.photos-items', function() {
        const imageUrl = $(this).data('image-url');
        // const reference = $(this).data('reference');
        const name = $(this).data('title');
        const category = $(this).data('category');

        
        // Mettre à jour l'image et les informations dans la lightbox
        $('.lightbox-image').attr('src', imageUrl);
        // $('.lightbox-reference').text( reference);
        $('.lightbox-category').text( category);
        $('.lightbox-title').text( name);

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
        const currentPhoto = $('.photos-items[data-image-url="' + $('.lightbox-image').attr('src') + '"]');
        const prevPhoto = currentPhoto.prev('.photos-items');

        if (prevPhoto.length) {
            const imageUrl = prevPhoto.data('image-url');
            const reference = prevPhoto.data('reference');
            const category = prevPhoto.data('category');
            const name = $(this).data('title');

            $('.lightbox-image').attr('src', imageUrl);
            $('.lightbox-reference').text( reference);
            $('.lightbox-category').text( category);
        }
    });

    $('.lightbox__arrows--next').on('click', function(e) {
        e.stopPropagation(); // Empêcher la propagation de l'événement
        const currentPhoto = $('.photos-items[data-image-url="' + $('.lightbox-image').attr('src') + '"]');
        const nextPhoto = currentPhoto.next('.photos-items');

        if (nextPhoto.length) {
            const imageUrl = nextPhoto.data('image-url');
            const reference = nextPhoto.data('reference');
            const category = nextPhoto.data('category');

            $('.lightbox-image').attr('src', imageUrl);
            $('.lightbox-reference').text('Référence: ' + reference);
            $('.lightbox-category').text('Catégorie: ' + category);
        }
    });
});

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
$(document).ready(function () {
    // Ouvrir la lightbox pour related-photo-item
    $('.related-photo-grid').on('click', '.related-photo-item', function () {
        const imageUrl = $(this).data('image-url');
        const reference = $(this).data('reference');
        const category = $(this).data('category');
        const name = $(this).data('title');

        $('.lightbox-image').attr('src', imageUrl);
        $('.lightbox-reference').text('Référence: ' + reference);
        $('.lightbox-category').text('Catégorie: ' + category);
        $('.lightbox-title').text(name);

        $('.lightbox-overlay, .lightbox').fadeIn();
    });

    // Fermer la lightbox
    $('.lightbox__close, .lightbox-overlay').on('click', function () {
        $('.lightbox-overlay, .lightbox').fadeOut();
    });

    // Rediriger vers la page de la photo
    $('.lightbox-image').on('click', function () {
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