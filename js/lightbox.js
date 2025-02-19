document.addEventListener('DOMContentLoaded', function () {
    const photosItems = document.querySelectorAll('.photos-items');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxReference = document.querySelector('.lightbox-reference');
    const lightboxCategory = document.querySelector('.lightbox-category');
    const lightboxClose = document.querySelector('.lightbox__close');
    const lightboxPrev = document.querySelector('.lightbox__arrows--previous');
    const lightboxNext = document.querySelector('.lightbox__arrows--next');

    let currentIndex = 0;
    let photosData = [];

    // Récupérer les données des photos
    photosItems.forEach((item, index) => {
        photosData.push({
            id: item.dataset.photoId,
            imageUrl: item.dataset.imageUrl,
            reference: item.dataset.reference,
            category: item.dataset.category
        });

        // Ajouter un écouteur d'événement pour ouvrir la lightbox
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Fonction pour ouvrir la lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightboxOverlay.style.display = 'block';
        lightbox.style.display = 'block';
    }

    // Fonction pour fermer la lightbox
    function closeLightbox() {
        lightboxOverlay.style.display = 'none';
        lightbox.style.display = 'none';
    }

    // Fonction pour mettre à jour le contenu de la lightbox
    function updateLightbox() {
        const currentPhoto = photosData[currentIndex];
        lightboxImage.src = currentPhoto.imageUrl;
        lightboxReference.textContent = currentPhoto.reference;
        lightboxCategory.textContent = currentPhoto.category;
    }

    // Écouteurs d'événements pour les boutons de navigation
    lightboxPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = photosData.length - 1;
        }
        updateLightbox();
    });

    lightboxNext.addEventListener('click', () => {
        if (currentIndex < photosData.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateLightbox();
    });

    // Écouteur d'événement pour fermer la lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);

    // Fermer la lightbox avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});