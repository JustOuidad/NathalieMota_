
document.addEventListener('DOMContentLoaded', function() {
    // Ouvre le modal quand on clique sur le bouton "Contact"
    const openModalButton = document.querySelector('#openModalButton');
    if (openModalButton) {
        openModalButton.addEventListener('click', function(event) {
            event.preventDefault(); // Empêche la redirection vers une autre page
            
            const modal = document.getElementById('modal-contact');
            if (modal) {
                modal.style.display = 'flex'; // Affiche le modal
            }
        });
    }
  
    // Ferme le modal quand on clique sur l'icône de fermeture (×)
    const closeModalButton = document.querySelector('.cross-icon-modale');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', function() {
            const modal = document.getElementById('modal-contact');
            if (modal) {
                modal.style.display = 'none'; // Cache le modal
            }
        });
    }
  
    // Ferme le modal si l'utilisateur clique en dehors du modal (sur le fond)
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal-contact');
        if (modal && event.target === modal) {
            modal.style.display = 'none'; // Cache le modal
        }
    });
});

// MENU
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.menu-toggle');
    const headerMenu = document.querySelector('.header-menu');

    toggleButton.addEventListener('click', function() {
        headerMenu.classList.toggle('active');
    });
});

// AJAX pour le LOAD MORE
jQuery(document).ready(function ($) {
    let currentCategorie = '';
    let currentFormat = '';
    let currentOrder = 'ASC';
    let page = 1;
    const photosPerPage = 8;
    let totalPhotosLoaded = 0; // Variable pour suivre le nombre total de photos chargées

    // Fonction pour charger les photos via AJAX
    function loadMorePhotos(page) {
        $.ajax({
            url: ajax_params.ajaxurl, // URL AJAX (passée par wp_localize_script)
            type: 'POST',
            data: {
                action: 'filter',
                categorie: currentCategorie,
                format: currentFormat,
                order: currentOrder,
                page: page,
                photosPerPage: photosPerPage,
            },
            success: function (response) {
                const newPhotos = $(response).filter('.photo-item').length; // Nombre de nouvelles photos chargées
                totalPhotosLoaded += newPhotos; // Mettre à jour le nombre total de photos chargées

                if (page === 1) {
                    $('.photo-grid').html(response); // Remplace le contenu pour la première page
                } else {
                    $('.photo-grid').append(response); // Ajoute les nouvelles photos
                }

                // Masquer le bouton "Charger plus" s'il n'y a plus de photos ou si 16 photos sont chargées
                if ($('#no-more-posts').length > 0 || newPhotos < photosPerPage || totalPhotosLoaded >= 16) {
                    $('#load-more').hide();
                } else {
                    $('#load-more').show().data('page', page);
                }
            },
            error: function (xhr, status, error) {
                console.error('Erreur AJAX :', error);
            },
        });
    }

    // Charger les photos initiales
    loadMorePhotos(page);

    // Événement pour les filtres
    $('.filter-categorie, .filter-format, .filter-order').change(function () {
        currentCategorie = $('#filter-categorie').val();
        currentFormat = $('#filter-format').val();
        currentOrder = $('#filter-order').val();
        page = 1; // Réinitialiser la page
        totalPhotosLoaded = 0; // Réinitialiser le compteur de photos chargées
        $('#load-more').hide(); // Masquer le bouton "Load More" lors de l'application des filtres
        loadMorePhotos(page); // Recharger les photos
    });

    // Événement pour le bouton "Charger plus"
    $('#load-more').click(function () {
        let nextPage = $(this).data('page') + 1;
        loadMorePhotos(nextPage);
    });
});
 
// Lightbox

// Importer lightbox.js
// // import { initLightbox } from './lightbox.js';

// // Utiliser la fonction de lightbox
// document.addEventListener('DOMContentLoaded', function () {
//     initLightbox();
// });

document.addEventListener('DOMContentLoaded', function () {
    const photoItems = document.querySelectorAll('.photo-item');

    photoItems.forEach(item => {
        item.addEventListener('click', function () {

            const photoData = item.querySelector('.photo-data');
            if (!photoData) {
                return;
            }

            const imageSrc = photoData.getAttribute('data-image');
            const reference = photoData.getAttribute('data-reference');
            const categorie = photoData.getAttribute('data-categorie');


            openLightbox(imageSrc, reference, categorie);
        });
    });

    function openLightbox(imageSrc, reference, categorie) {

        const lightboxImage = document.querySelector('.lightbox__image');
        const lightboxRef = document.querySelector('.lightbox__infos--Ref');
        const lightboxCategorie = document.querySelector('.lightbox__infos--Categorie');
        const lightbox = document.querySelector('.lightbox');
        const lightboxOverlay = document.querySelector('.lightbox-overlay');


        if (!lightboxImage || !lightboxRef || !lightboxCategorie || !lightbox || !lightboxOverlay) {
            return;
        }

        lightboxImage.src = imageSrc;
        lightboxRef.textContent = reference;
        lightboxCategorie.textContent = categorie;
        lightbox.style.display = 'block';
        lightboxOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Fermer la lightbox
    const lightboxClose = document.querySelector('.lightbox__close');
    if (lightboxClose) {
        lightboxClose.addEventListener('click', function () {
            const lightbox = document.querySelector('.lightbox');
            const lightboxOverlay = document.querySelector('.lightbox-overlay');

            if (lightbox && lightboxOverlay) {
                lightbox.style.display = 'none';
                lightboxOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});
jQuery(document).ready(function ($) {
    // Fonction pour appliquer les styles après un chargement AJAX
    function applyStyles() {
        $('.photos-items').hover(
            function () {
                $(this).find('.picture-overlay').css('opacity', '1');
            },
            function () {
                $(this).find('.picture-overlay').css('opacity', '0');
            }
        );
    }

    // Appliquer les styles initialement
    applyStyles();

    // Réappliquer les styles après un chargement AJAX
    $('#load-more').click(function () {
        setTimeout(function () {
            applyStyles(); // Réappliquer les styles après un court délai
        }, 100);
    });
});
