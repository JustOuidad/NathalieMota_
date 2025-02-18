// document.querySelectorAll('.photo-item').forEach(item => {
//     item.addEventListener('click', function (e) {
//         e.preventDefault();

//         const photoId = this.dataset.photoId;
//         console.log("ID de l'image cliquée :", photoId);

//         fetch(lightbox_ajax_object.ajax_url, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//             body: `action=get_photo_data&security=${lightbox_ajax_object.security}&photoId=${photoId}`
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 openLightbox(data.data);
//             } else {
//                 console.error('Erreur de récupération des données.');
//             }
//         })
//         .catch(() => console.error('Erreur d\'AJAX.'));
//     });
// });





// function openLightbox(photoData) {
//     console.log("Ouverture de la lightbox :", photoData);

//     const lightboxOverlay = document.querySelector('.lightbox-overlay');
//     if (!lightboxOverlay) {
//         console.error("La lightbox n'existe pas.");
//         return;
//     }

//     const image = document.querySelector('.lightbox-image');
//     const reference = document.querySelector('.lightbox-reference');
//     const category = document.querySelector('.lightbox-category');

//     if (image && reference && category) {
//         image.src = photoData.url;
//         reference.textContent = photoData.reference;
//         category.textContent = photoData.category;
//         lightboxOverlay.dataset.currentPhotoId = photoData.id;
//         lightboxOverlay.style.display = 'flex';
//     } else {
//         console.error("Éléments de la lightbox non trouvés.");
//     }
// }
// document.addEventListener('click', function (event) {
//     if (event.target.classList.contains('lightbox-image')) {
//         console.log('🖼️ Lightbox activé sur', event.target);
//     }
// });
// document.addEventListener('DOMContentLoaded', function () {
//     // Ajouter un écouteur d'événement à chaque élément photo
//     document.querySelectorAll('.photo-item').forEach(item => {
//         item.addEventListener('click', function (e) {
//             e.preventDefault();

//             // Récupérer l'ID de la photo
//             const photoId = this.dataset.photoId;
//             console.log("ID de l'image cliquée :", photoId);

//             // Envoyer une requête AJAX pour récupérer les données de la photo
//             fetch(lightbox_ajax_object.ajax_url, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//                 body: `action=get_photo_data&security=${lightbox_ajax_object.security}&photoId=${photoId}`
//             })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.success) {
//                     openLightbox(data.data); // Ouvrir la lightbox avec les données
//                 } else {
//                     console.error('Erreur de récupération des données.');
//                 }
//             })
//             .catch(() => console.error('Erreur d\'AJAX.'));
//         });
//     });

//     // Fonction pour ouvrir la lightbox
//     function openLightbox(photoData) {
//         console.log("Ouverture de la lightbox :", photoData);

//         const lightboxOverlay = document.querySelector('.lightbox-overlay');
//         const lightbox = document.querySelector('.lightbox');
//         const image = document.querySelector('.lightbox-image');
//         const reference = document.querySelector('.lightbox-reference');
//         const category = document.querySelector('.lightbox-category');

//         if (lightboxOverlay && lightbox && image && reference && category) {
//             image.src = photoData.url; // Mettre à jour l'image
//             reference.textContent = photoData.reference; // Mettre à jour la référence
//             category.textContent = photoData.category; // Mettre à jour la catégorie
//             lightboxOverlay.style.display = 'flex'; // Afficher l'overlay
//             lightbox.style.display = 'block'; // Afficher la lightbox
//         } else {
//             console.error("Éléments de la lightbox non trouvés.");
//         }
//     }

//     // Fermer la lightbox
//     document.querySelector('.lightbox__close').addEventListener('click', function () {
//         const lightboxOverlay = document.querySelector('.lightbox-overlay');
//         const lightbox = document.querySelector('.lightbox');

//         if (lightboxOverlay && lightbox) {
//             lightboxOverlay.style.display = 'none'; // Masquer l'overlay
//             lightbox.style.display = 'none'; // Masquer la lightbox
//         }
//     });

//     // Navigation entre les images (précédente/suivante)
//     document.querySelector('.lightbox__arrows--previous').addEventListener('click', function () {
//         console.log('Image précédente');
//         // Ajouter la logique pour afficher l'image précédente
//     });

//     document.querySelector('.lightbox__arrows--next').addEventListener('click', function () {
//         console.log('Image suivante');
//         // Ajouter la logique pour afficher l'image suivante
//     });
// });