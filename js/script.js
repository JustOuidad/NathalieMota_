// Menu-Toggle
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