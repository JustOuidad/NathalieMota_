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