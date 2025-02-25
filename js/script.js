
// document.addEventListener('DOMContentLoaded', function() {
//     // Ouvre le modal quand on clique sur le bouton "Contact"
//     const openModalButton = document.querySelector('#openModalButton');
//     if (openModalButton) {
//         openModalButton.addEventListener('click', function(event) {
//             event.preventDefault(); // Empêche la redirection vers une autre page
            
//             const modal = document.getElementById('modal-contact');
//             if (modal) {
//                 modal.style.display = 'flex'; // Affiche le modal
//             }
//         });
//     }
  
//     // Ferme le modal quand on clique sur l'icône de fermeture (×)
//     const closeModalButton = document.querySelector('.cross-icon-modale');
//     if (closeModalButton) {
//         closeModalButton.addEventListener('click', function() {
//             const modal = document.getElementById('modal-contact');
//             if (modal) {
//                 modal.style.display = 'none'; // Cache le modal
//             }
//         });
//     }
  
//     // Ferme le modal si l'utilisateur clique en dehors du modal (sur le fond)
//     window.addEventListener('click', function(event) {
//         const modal = document.getElementById('modal-contact');
//         if (modal && event.target === modal) {
//             modal.style.display = 'none'; // Cache le modal
//         }
//     });
// });

// // MENU
// document.addEventListener('DOMContentLoaded', function() {
//     const toggleButton = document.querySelector('.menu-toggle');
//     const headerMenu = document.querySelector('.header-menu');

//     toggleButton.addEventListener('click', function() {
//         headerMenu.classList.toggle('active');
//     });
// });

// // AJAX pour le LOAD MORE
// jQuery(document).ready(function ($) {
//     let currentCategorie = '';
//     let currentFormat = '';
//     let currentOrder = 'ASC';
//     let page = 1;
//     const photosPerPage = 8;
//     let totalPhotosLoaded = 0; // Variable pour suivre le nombre total de photos chargées

//     // Fonction pour charger les photos via AJAX
//     function loadMorePhotos(page) {
//         $.ajax({
//             url: ajax_params.ajaxurl, // URL AJAX (passée par wp_localize_script)
//             type: 'POST',
//             data: {
//                 action: 'filter',
//                 categorie: currentCategorie,
//                 format: currentFormat,
//                 order: currentOrder,
//                 page: page,
//                 photosPerPage: photosPerPage,
//             },
//             success: function (response) {
//                 const newPhotos = $(response).filter('.photo-item').length; // Nombre de nouvelles photos chargées
//                 totalPhotosLoaded += newPhotos; // Mettre à jour le nombre total de photos chargées

//                 if (page === 1) {
//                     $('.photo-grid').html(response); // Remplace le contenu pour la première page
//                 } else {
//                     $('.photo-grid').append(response); // Ajoute les nouvelles photos
//                 }

//                 // Masquer le bouton "Charger plus" s'il n'y a plus de photos ou si 16 photos sont chargées
//                 if ($('#no-more-posts').length > 0 || newPhotos < photosPerPage || totalPhotosLoaded >= 16) {
//                     $('#load-more').hide();
//                 } else {
//                     $('#load-more').show().data('page', page);
//                 }
//             },
//             error: function (xhr, status, error) {
//                 console.error('Erreur AJAX :', error);
//             },
//         });
//     }

//     // Charger les photos initiales
//     loadMorePhotos(page);

//     // Événement pour les filtres
//     $('.filter-categorie, .filter-format, .filter-order').change(function () {
//         currentCategorie = $('#filter-categorie').val();
//         currentFormat = $('#filter-format').val();
//         currentOrder = $('#filter-order').val();
//         page = 1; // Réinitialiser la page
//         totalPhotosLoaded = 0; // Réinitialiser le compteur de photos chargées
//         $('#load-more').hide(); // Masquer le bouton "Load More" lors de l'application des filtres
//         loadMorePhotos(page); // Recharger les photos
//     });

//     // Événement pour le bouton "Charger plus"
//     $('#load-more').click(function () {
//         let nextPage = $(this).data('page') + 1;
//         loadMorePhotos(nextPage);
//     });
// });
 
// // Lightbox

// // Importer lightbox.js
// import { initLightbox } from './lightbox.js';

// // // Utiliser la fonction de lightbox
// // document.addEventListener('DOMContentLoaded', function () {
// //     initLightbox();
// // });

// jQuery(document).ready(function($) {
//     // Redirection vers la page photo_block.php lors du clic sur une photo
//     $('.photos-items').on('click', function() {
//         const photoId = $(this).data('photo-id'); // Récupère l'ID de la photo
//         window.location.href = '<?= home_url("photo_block") ?>?photo_id=' + photoId; // Redirige vers la page photo_block.php avec l'ID de la photo
//     });
// });

// document.addEventListener('DOMContentLoaded', function () {
//     const photoItems = document.querySelectorAll('.photo-item');

//     photoItems.forEach(item => {
//         item.addEventListener('click', function () {

//             const photoData = item.querySelector('.photo-data');
//             if (!photoData) {
//                 return;
//             }

//             const imageSrc = photoData.getAttribute('data-image');
//             const reference = photoData.getAttribute('data-reference');
//             const categorie = photoData.getAttribute('data-categorie');


//             openLightbox(imageSrc, reference, categorie);
//         });
//     });

//     function openLightbox(imageSrc, reference, categorie) {

//         const lightboxImage = document.querySelector('.lightbox__image');
//         const lightboxRef = document.querySelector('.lightbox__infos--Ref');
//         const lightboxCategorie = document.querySelector('.lightbox__infos--Categorie');
//         const lightbox = document.querySelector('.lightbox');
//         const lightboxOverlay = document.querySelector('.lightbox-overlay');


//         if (!lightboxImage || !lightboxRef || !lightboxCategorie || !lightbox || !lightboxOverlay) {
//             return;
//         }

//         lightboxImage.src = imageSrc;
//         lightboxRef.textContent = reference;
//         lightboxCategorie.textContent = categorie;
//         lightbox.style.display = 'block';
//         lightboxOverlay.style.display = 'block';
//         document.body.style.overflow = 'hidden';
//     }

//     // Fermer la lightbox
//     const lightboxClose = document.querySelector('.lightbox__close');
//     if (lightboxClose) {
//         lightboxClose.addEventListener('click', function () {
//             const lightbox = document.querySelector('.lightbox');
//             const lightboxOverlay = document.querySelector('.lightbox-overlay');

//             if (lightbox && lightboxOverlay) {
//                 lightbox.style.display = 'none';
//                 lightboxOverlay.style.display = 'none';
//                 document.body.style.overflow = 'auto';
//             }
//         });
//     }
// });
// jQuery(document).ready(function ($) {
//     // Fonction pour appliquer les styles après un chargement AJAX
//     function applyStyles() {
//         $('.photos-items').hover(
//             function () {
//                 $(this).find('.picture-overlay').css('opacity', '1');
//             },
//             function () {
//                 $(this).find('.picture-overlay').css('opacity', '0');
//             }
//         );
//     }

//     // Appliquer les styles initialement
//     applyStyles();

//     // Réappliquer les styles après un chargement AJAX
//     $('#load-more').click(function () {
//         setTimeout(function () {
//             applyStyles(); 
//         }, 100);
//     });
// });// Menu-Toggle
document.addEventListener('DOMContentLoaded', function () {
    // Menu-Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuContainer = document.querySelector('.menu-container');

    if (menuToggle && menuContainer) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuContainer.classList.toggle('active');
        });
    }

    // Tableaux Variables
    let currentPage = 1; // Page actuelle pour le load more
    let lightboxIndex = 0; // Index de la photo actuelle dans la lightbox
    let lightboxPhotos = []; // Tableau des photos pour la lightbox
    let currentCategorie = ''; // Filtre catégorie
    let currentFormat = ''; // Filtre format
    let currentOrder = 'ASC'; // Filtre ordre de tri

    // 1. Modal pour le formulaire de contact
    const openModalButton = document.querySelector('#openModalButton');
    const closeModalButton = document.querySelector('.cross-icon-modale');
    const modal = document.getElementById('modal-contact');

    if (openModalButton && modal) {
        openModalButton.addEventListener('click', function (e) {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }

    if (closeModalButton && modal) {
        closeModalButton.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Fermer le modal si on clique en dehors
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 2. Load More
    const loadMoreButton = document.getElementById('load-more');
    const photoGrid = document.querySelector('.photo-grid');

    if (loadMoreButton && photoGrid) {
        loadMoreButton.addEventListener('click', function () {
            currentPage++;
            loadMorePhotos(currentPage);
        });
    }

    // 3. Filtres
    const categorieFilter = document.getElementById('filter-categorie');
    const formatFilter = document.getElementById('filter-format');
    const orderFilter = document.getElementById('filter-order');

    if (categorieFilter && formatFilter && orderFilter) {
        categorieFilter.addEventListener('change', function () {
            currentCategorie = this.value;
            applyFilters();
        });

        formatFilter.addEventListener('change', function () {
            currentFormat = this.value;
            applyFilters();
        });

        orderFilter.addEventListener('change', function () {
            currentOrder = this.value;
            applyFilters();
        });
    }

    // Appliquer les filtres
    function applyFilters() {
        currentPage = 1; // Réinitialiser la page
        loadMorePhotos(currentPage, true); // Recharger les photos avec les nouveaux filtres
    }

    // Charger les photos via AJAX
    function loadMorePhotos(page, replaceContent = false) {
        fetch(ajax_params.ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'charger_photos_via_ajax',
                categorie: currentCategorie || '', // Filtre catégorie
                format: currentFormat || '', // Filtre format
                order: currentOrder || 'ASC', // Filtre ordre
                page: page || 1, // Page actuelle
            }),
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Erreur serveur :', response.status, response.statusText);
                    return response.text().then(text => { throw new Error(text); });
                }
                return response.text();
            })
            .then(data => {
                console.log('Réponse du serveur :', data);

                // Mettre à jour le contenu de la grille de photos
                if (replaceContent) {
                    photoGrid.innerHTML = data; // Remplacer le contenu existant
                } else {
                    photoGrid.innerHTML += data; // Ajouter les nouvelles photos
                }

                // Mettre à jour les photos pour la lightbox
                lightboxPhotos = Array.from(document.querySelectorAll('.photo-grid .photos-items'));

                // Masquer le bouton "Load More" s'il n'y a plus de photos
                if (data.includes('no-more-posts') || lightboxPhotos.length < 8) {
                    loadMoreButton.style.display = 'none';
                } else {
                    loadMoreButton.style.display = 'block';
                }
            })
            .catch(error => console.error('Erreur AJAX :', error));
    }

    // Mettre à jour l'image de la lightbox
    function updateLightboxImage() {
        const lightboxImage = document.querySelector('.lightbox-image');
        if (lightboxPhotos[lightboxIndex]) {
            const imageUrl = lightboxPhotos[lightboxIndex].getAttribute('data-image-url');
            lightboxImage.src = imageUrl;
        }
    }
});