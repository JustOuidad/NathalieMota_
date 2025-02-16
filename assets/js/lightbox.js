'use strict';

document.addEventListener('DOMContentLoaded', () => {
    attachLightboxEvents();

    // Réattacher les événements après un rafraîchissement dynamique du contenu
    document.addEventListener('refreshLightboxEvents', () => {
        attachLightboxEvents();
    });
});

const attachLightboxEvents = () => {
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxImage = lightboxOverlay.querySelector('.lightbox-image');
    const lightboxRef = lightboxOverlay.querySelector('.lightbox-reference');
    const lightboxCategorie = lightboxOverlay.querySelector('.lightbox-category');
    const closeBtn = lightboxOverlay.querySelector('.lightbox__close');
    const prevBtn = lightboxOverlay.querySelector('.lightbox__arrows--previous');
    const nextBtn = lightboxOverlay.querySelector('.lightbox__arrows--next');

    const images = [];
    document.querySelectorAll('.photo-item').forEach((item, index) => {
        const photoId = item.dataset.photoId;
        const imageUrl = item.dataset.imageUrl;
        const reference = item.dataset.reference;
        const category = item.dataset.category;

        // Stocker les informations de chaque photo
        images.push({ id: photoId, url: imageUrl, reference, category });

        // Ouvrir la lightbox au clic sur une photo
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    let currentIndex = 0;

    const openLightbox = (index) => {
        if (index < 0 || index >= images.length) {
            console.error(`Index invalide : ${index}`);
            return;
        }

        currentIndex = index;
        const image = images[currentIndex];

        if (!image) {
            console.error(`Image non trouvée à l'index : ${currentIndex}`);
            return;
        }

        // Mettre à jour les éléments de la lightbox avec les données de la photo
        lightboxImage.src = image.url;
        lightboxRef.textContent = image.reference;
        lightboxCategorie.textContent = image.category;
        lightboxOverlay.dataset.currentPhotoId = image.id;
        lightboxOverlay.style.display = 'flex';

        // Ajouter les écouteurs d'événements pour la navigation au clavier
        document.addEventListener('keydown', handleKeydown);
    };

    const changeImage = (direction) => {
        const newIndex = (currentIndex + direction + images.length) % images.length;
        openLightbox(newIndex);
    };

    const closeLightbox = () => {
        lightboxOverlay.style.display = 'none';
        document.removeEventListener('keydown', handleKeydown);
    };

    const handleKeydown = (e) => {
        if (e.key === 'ArrowLeft') {
            changeImage(-1); // Photo précédente
        } else if (e.key === 'ArrowRight') {
            changeImage(1); // Photo suivante
        } else if (e.key === 'Escape') {
            closeLightbox(); // Fermer la lightbox
        }
    };

    // Fermer la lightbox au clic sur le bouton de fermeture
    closeBtn.addEventListener('click', closeLightbox);

    // Navigation entre les photos
    prevBtn.addEventListener('click', () => changeImage(-1)); // Photo précédente
    nextBtn.addEventListener('click', () => changeImage(1)); // Photo suivante

    // Fermer la lightbox au clic en dehors de l'image
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });
};