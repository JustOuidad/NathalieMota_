document.addEventListener('DOMContentLoaded', function () {
    // Variables globales
    let currentPage = 1; // Page actuelle pour le load more
    let lightboxIndex = 0; // Index de la photo actuelle dans la lightbox
    let lightboxPhotos = []; // Tableau des photos pour la lightbox

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

    function loadMorePhotos(page) {
        fetch(ajax_params.ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'filter',
                page: page,
            }),
        })
            .then(response => response.text())
            .then(data => {
                if (data.includes('no-more-posts')) {
                    loadMoreButton.style.display = 'none'; // Masquer le bouton si plus de photos
                } else {
                    photoGrid.insertAdjacentHTML('beforeend', data); // Ajouter les nouvelles photos
                    lightboxPhotos = Array.from(document.querySelectorAll('.photo-item')); // Mettre à jour les photos pour la lightbox
                }
            })
            .catch(error => console.error('Erreur AJAX :', error));
    }

    // 3. Lightbox
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="" alt="Lightbox Image" class="lightbox-image">
            <div class="lightbox-nav">
                <span class="prev">&#10094;</span>
                <span class="next">&#10095;</span>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Ouvrir la lightbox
    document.querySelectorAll('.photo-item').forEach((photo, index) => {
        photo.addEventListener('click', () => {
            lightboxIndex = index;
            updateLightboxImage();
            lightbox.style.display = 'flex';
        });
    });

    // Fermer la lightbox
    lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Navigation dans la lightbox
    lightbox.querySelector('.prev').addEventListener('click', () => {
        lightboxIndex = (lightboxIndex - 1 + lightboxPhotos.length) % lightboxPhotos.length;
        updateLightboxImage();
    });

    lightbox.querySelector('.next').addEventListener('click', () => {
        lightboxIndex = (lightboxIndex + 1) % lightboxPhotos.length;
        updateLightboxImage();
    });

    // Mettre à jour l'image de la lightbox
    function updateLightboxImage() {
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const currentPhoto = lightboxPhotos[lightboxIndex];
        const imageUrl = currentPhoto.querySelector('img').src;
        lightboxImage.src = imageUrl;
    }
});