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

document.addEventListener('DOMContentLoaded', function () {
    // Ouvrir la modale de contact avec la référence préremplie
    document.querySelectorAll('.open-modal').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const reference = this.getAttribute('data-reference');
            document.getElementById('modal-contact').style.display = 'flex';
            document.getElementById('photo-reference').value = reference; // Préremplir le champ référence
        });
    });

    // Afficher les miniatures au survol des liens de navigation
    document.querySelectorAll('.prev-photo, .next-photo').forEach(function (link) {
        link.addEventListener('mouseenter', function () {
            const thumbnail = this.getAttribute('data-thumbnail');
            const tooltip = document.createElement('div');
            tooltip.className = 'navigation-tooltip';
            tooltip.innerHTML = `<img src="${thumbnail}" alt="Thumbnail">`;
            this.appendChild(tooltip);
        });

        link.addEventListener('mouseleave', function () {
            const tooltip = this.querySelector('.navigation-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});