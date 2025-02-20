jQuery(document).ready(function($) {
    // Ouvrir la lightbox
    $('.photos-items').on('click', function() {
        const imageUrl = $(this).data('image-url');
        const reference = $(this).data('reference');
        const category = $(this).data('category');

        $('.lightbox-image').attr('src', imageUrl);
        $('.lightbox-reference').text('Référence: ' + reference);
        $('.lightbox-category').text('Catégorie: ' + category);

        $('.lightbox-overlay, .lightbox').fadeIn();
    });

    // Fermer la lightbox
    $('.lightbox__close').on('click', function() {
        $('.lightbox-overlay, .lightbox').fadeOut();
    });

    // Navigation entre les images
    $('.lightbox__arrows--previous').on('click', function() {
        const currentPhoto = $('.photos-items[data-image-url="' + $('.lightbox-image').attr('src') + '"]');
        const prevPhoto = currentPhoto.prev('.photos-items');

        if (prevPhoto.length) {
            const imageUrl = prevPhoto.data('image-url');
            const reference = prevPhoto.data('reference');
            const category = prevPhoto.data('category');

            $('.lightbox-image').attr('src', imageUrl);
            $('.lightbox-reference').text('Référence: ' + reference);
            $('.lightbox-category').text('Catégorie: ' + category);
        }
    });

    $('.lightbox__arrows--next').on('click', function() {
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