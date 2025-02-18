// document.addEventListener('DOMContentLoaded', function () {
//     // Ouvre le modal quand on clique sur le bouton "Contact"
//     const openModalButton = document.querySelector('#openModalButton');
//     if (openModalButton) {
//         openModalButton.addEventListener('click', function (event) {
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
//         closeModalButton.addEventListener('click', function () {
//             const modal = document.getElementById('modal-contact');
//             if (modal) {
//                 modal.style.display = 'none'; // Cache le modal
//             }
//         });
//     }

//     // Ferme le modal si l'utilisateur clique en dehors du modal (sur le fond)
//     window.addEventListener('click', function (event) {
//         const modal = document.getElementById('modal-contact');
//         if (modal && event.target === modal) {
//             modal.style.display = 'none'; // Cache le modal
//         }
//     });
// });

// // MENU
// document.addEventListener('DOMContentLoaded', function () {
//     const toggleButton = document.querySelector('.menu-toggle');
//     const headerMenu = document.querySelector('.header-menu');

//     toggleButton.addEventListener('click', function () {
//         headerMenu.classList.toggle('active');
//     });
// });

// // AJAX pour le LOAD MORE
// jQuery(document).ready(function ($) {
//     let currentCategorie = $('.filter-categorie').val() || '';
//     let currentFormat = $('.filter-format').val() || '';
//     let currentOrder = $('.filter-order').val() || 'ASC';
//     let page = 1; // Page initiale
//     let totalPhotos = 0; // Compteur de photos chargées

//     function loadMorePhotos(page) {
//         console.log('Chargement de la page :', page); // DEBUG: Vérifier l'incrémentation

//         $.ajax({
//             url: ajax_params.ajaxurl, // URL AJAX (passée par wp_localize_script)
//             type: 'POST',
//             data: {
//                 action: 'filter',
//                 categorie: currentCategorie,
//                 format: currentFormat,
//                 order: currentOrder,
//                 page: page,
//             },
//             beforeSend: function () {
//                 $('#load-more').text('Chargement...'); // Indication de chargement
//             },
//             success: function (response) {
//                 console.log('Réponse AJAX reçue :', response); // DEBUG: Vérifier la réponse du serveur

//                 let newPhotos = $(response).filter('.photo-item').length; // Nombre de nouvelles photos
//                 totalPhotos += newPhotos; // Mettre à jour le compteur total

//                 console.log('Total des photos affichées :', totalPhotos); // DEBUG: Vérifier le total des photos affichées

//                 if (page === 1) {
//                     $('.photo-grid').html(response); // Remplace les photos initiales
//                 } else {
//                     $('.photo-grid').append(response); // Ajoute les nouvelles photos
//                 }

//                 // Vérifie si on a atteint ou dépassé 16 photos ou s'il n'y a plus de photos à charger
//                 if (totalPhotos >= 16 || $('#no-more-posts').length > 0) {
//                     $('#load-more').hide();
//                 } else {
//                     $('#load-more').show().data('page', page);
//                 }
//             },
//             error: function (xhr, status, error) {
//                 console.error('Erreur AJAX :', error);
//             },
//             complete: function () {
//                 $('#load-more').text('Charger plus'); // Réinitialiser le texte du bouton
//             }
//         });
//     }

//     // Charger les photos initiales
//     loadMorePhotos(page);

//     // Événement pour les filtres
//     $('.filter-categorie, .filter-format, .filter-order').change(function () {
//         currentCategorie = $('#filter-categorie').val();
//         currentFormat = $('#filter-format').val();
//         currentOrder = $('#filter-order').val();
//         page = 1; // Réinitialiser à la première page
//         totalPhotos = 0; // Réinitialiser le compteur de photos
//         loadMorePhotos(page);
//     });

//     // Événement pour le bouton "Charger plus"
//     $('#load-more').click(function () {
//         let nextPage = $(this).data('page') + 1;
//         loadMorePhotos(nextPage);
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const eyeIcon = document.querySelector('.eye-icon');
//     if (eyeIcon) {
//         // Vérifier une propriété CSS spécifique
//         const iconStyle = getComputedStyle(eyeIcon);
//         console.log('✅ Style appliqué à .eye-icon :', iconStyle);
//     }
// });
// import Lightbox from './lightbox.js';
/* <script src="/js/lightbox.js" defer></script> */



// console.log('Page:', page);
// console.log('Response:', response);
// console.log('ok');
//lightbox
// document.addEventListener('DOMContentLoaded', function () {
//     const photoItems = document.querySelectorAll('.photo-item');

//     photoItems.forEach(item => {
//         item.addEventListener('click', function () {
//             const imageUrl = item.querySelector('img').src;
//             const reference = item.dataset.reference;
//             const category = item.dataset.category;

//             openLightbox(imageUrl, reference, category);
//         });
//     });

//     function openLightbox(imageUrl, reference, category) {
//         const lightbox = document.querySelector('.lightbox');
//         const lightboxImage = lightbox.querySelector('.lightbox__image');
//         const lightboxRef = lightbox.querySelector('.lightbox__infos--Ref');
//         const lightboxCategory = lightbox.querySelector('.lightbox__infos--Categorie');

//         // Mettre à jour les éléments de la lightbox
//         lightboxImage.src = imageUrl;
//         lightboxRef.textContent = reference;
//         lightboxCategory.textContent = category;

//         // Afficher la lightbox
//         lightbox.style.display = 'block';
//     }

//     // Fermer la lightbox
//     const closeLightboxButton = document.querySelector('.lightbox__close');
//     if (closeLightboxButton) {
//         closeLightboxButton.addEventListener('click', function () {
//             const lightbox = document.querySelector('.lightbox');
//             lightbox.style.display = 'none';
//         });
//     }
// });


// script.js

// document.addEventListener('DOMContentLoaded', function() {
//     // Initialisation des fonctionnalités
//     initLoadMore();
//     initLightbox();
// });

// // Fonction pour gérer le "load more"
// function initLoadMore() {
//     const loadMoreButton = document.querySelector('.load-more');
//     if (loadMoreButton) {
//         loadMoreButton.addEventListener('click', function(event) {
//             event.preventDefault();
//             loadMorePosts();
//         });
//     }
// }

// // Fonction pour charger plus de posts via AJAX
// function loadMorePosts() {
//     const paged = ajax_params.paged || 1; // Récupère la page actuelle
//     const ajaxurl = ajax_params.ajaxurl; // URL pour les requêtes AJAX

//     fetch(ajaxurl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `action=filter&paged=${paged}`, // Envoie la page actuelle au serveur
//     })
//     .then(response => response.text())
//     .then(data => {
//         // Ajoute les nouveaux posts à la page
//         document.querySelector('.photo-container').insertAdjacentHTML('beforeend', data);
//         // Met à jour le numéro de page
//         ajax_params.paged = parseInt(paged) + 1;
//     })
//     .catch(error => console.error('Erreur lors du chargement des posts :', error));
// }

// // Fonction pour initialiser la lightbox
// function initLightbox() {
//     const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
//     lightboxTriggers.forEach(function(trigger) {
//         trigger.addEventListener('click', function(event) {
//             event.preventDefault();
//             const imageUrl = this.getAttribute('href');
//             openLightbox(imageUrl);
//         });
//     });
// }

// // Fonction pour ouvrir la lightbox
// function openLightbox(imageUrl) {
//     const lightbox = document.createElement('div');
//     lightbox.classList.add('lightbox');
//     lightbox.innerHTML = `
//         <div class="lightbox-content">
//             <img src="${imageUrl}" alt="Lightbox Image">
//             <span class="close-lightbox">&times;</span>
//         </div>
//     `;
//     document.body.appendChild(lightbox);

//     const closeButton = lightbox.querySelector('.close-lightbox');
//     closeButton.addEventListener('click', function() {
//         lightbox.remove();
//     });
// }
