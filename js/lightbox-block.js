$(document).ready(function () {
    // Ouvrir la lightbox pour photo-grid
    $('.photo-grid').on('click', '.photos-items', function () {
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

    // Navigation entre les images (précédente)
    $('.lightbox__arrows--previous').on('click', function (e) {
        e.stopPropagation();
        const currentPhoto = $('.related-photo-item[data-image-url="' + $('.lightbox-image').attr('src') + '"]');
        const prevPhoto = currentPhoto.prev('.related-photo-item');

        if (prevPhoto.length) {
            const imageUrl = prevPhoto.data('image-url');
            const reference = prevPhoto.data('reference');
            const category = prevPhoto.data('category');
            const name = prevPhoto.data('title');

            $('.lightbox-image').attr('src', imageUrl);
            $('.lightbox-reference').text('Référence: ' + reference);
            $('.lightbox-category').text('Catégorie: ' + category);
            $('.lightbox-title').text(name);
        }
    });

    // Navigation entre les images (suivante)
    $('.lightbox__arrows--next').on('click', function (e) {
        e.stopPropagation();
        const currentPhoto = $('.related-photo-item[data-image-url="' + $('.lightbox-image').attr('src') + '"]');
        const nextPhoto = currentPhoto.next('.related-photo-item');

        if (nextPhoto.length) {
            const imageUrl = nextPhoto.data('image-url');
            const reference = nextPhoto.data('reference');
            const category = nextPhoto.data('category');
            const name = nextPhoto.data('title');

            $('.lightbox-image').attr('src', imageUrl);
            $('.lightbox-reference').text('Référence: ' + reference);
            $('.lightbox-category').text('Catégorie: ' + category);
            $('.lightbox-title').text(name);
        }
    });

    // Rediriger vers photo_block.php
    $('.lightbox-image').on('click', function () {
        const currentPhoto = $('.related-photo-item[data-image-url="' + $(this).attr('src') + '"]');
        if (currentPhoto.length) {
            const photoId = currentPhoto.data('photo-id');
            if (photoId) {
                window.location.href = `Photo/${photoId}`;
            }
        }
    });
});