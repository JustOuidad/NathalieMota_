// Hero-Header
document.addEventListener("DOMContentLoaded", function() {
    const heroImage = document.querySelector('.hero-image img');

    if (heroImage) {
        // Attendre que l'image soit chargée
        heroImage.onload = function() {
            const container = document.querySelector('.hero-image');
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            const imgWidth = heroImage.naturalWidth;
            const imgHeight = heroImage.naturalHeight;

            // Calculer le ratio de l'image et du conteneur
            const imgRatio = imgWidth / imgHeight;
            const containerRatio = containerWidth / containerHeight;

            // Ajuster l'image en fonction du ratio
            if (imgRatio > containerRatio) {
                heroImage.style.width = 'auto';
                heroImage.style.height = '100%';
            } else {
                heroImage.style.width = '100%';
                heroImage.style.height = 'auto';
            }
        };

        // Si l'image est déjà chargée (cas du cache)
        if (heroImage.complete) {
            heroImage.onload();
        }
    }
}); 

//Menu
document.addEventListener('DOMContentLoaded', function () {
    // Menu-Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuContainer = document.querySelector('.menu-container');
    
    if (menuToggle && menuContainer) {
        menuToggle.addEventListener('click', function () {
            // Basculer l'état "ouvert/fermé" du menu
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
    
            // Basculer la classe "active" sur le conteneur du menu
            menuContainer.classList.toggle('active');
    
            // Basculer la classe "active" sur le bouton toggle pour la croix
            menuToggle.classList.toggle('active');
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
                if (data.includes('no-more-posts') || lightboxPhotos.length === 16) {
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
//Photo block

document.addEventListener('DOMContentLoaded', function () {
    // Gérer le clic sur la photo dans la lightbox
    const lightboxImage = document.querySelector('.lightbox-image'); // Sélectionnez l'image de la lightbox
    if (lightboxImage) {
        lightboxImage.addEventListener('click', function () {
            // Récupérer l'ID de la photo actuellement affichée dans la lightbox
            const currentPhoto = lightboxPhotos[lightboxIndex];
            if (currentPhoto) {
                const photoId = currentPhoto.getAttribute('data-photo-id');
                if (photoId) {
                    // Rediriger vers la page photo_block.php avec l'ID de la photo
                    window.location.href = `photos/${photoId}`;
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Initialiser Choices.js sur les menus déroulants
    const categorieFilter = new Choices('#filter-categorie', {
        searchEnabled: false, // Désactiver la recherche
        itemSelectText: '', // Supprimer le texte "Appuyez pour sélectionner"
    });
    console.log ('choices me casse les couilles');

    const formatFilter = new Choices('#filter-format', {
        searchEnabled: false,
        itemSelectText: '',
    });

    const orderFilter = new Choices('#filter-order', {
        searchEnabled: false,
        itemSelectText: '',
    });
});
//Choices pour menu deroulant
document.addEventListener('DOMContentLoaded', function () {
    const customSelects = document.querySelectorAll('.custom-select');

    customSelects.forEach(select => {
        const selectedOption = select.querySelector('.selected-option');
        const options = select.querySelector('.options');
        const optionsList = options.querySelectorAll('li');

        // Ouvrir/fermer le menu déroulant
        selectedOption.addEventListener('click', () => {
            select.classList.toggle('open');
        });

        // Sélectionner une option
        optionsList.forEach(option => {
            option.addEventListener('click', () => {
                // Mettre à jour l'option sélectionnée
                selectedOption.querySelector('span').textContent = option.textContent;
                select.classList.remove('open');

                // Récupérer la valeur de l'option
                const value = option.getAttribute('data-value');
                console.log('Valeur sélectionnée :', value);

                // Vous pouvez maintenant utiliser cette valeur pour filtrer ou d'autres actions
            });
        });

        // Fermer le menu déroulant si on clique à l'extérieur
        document.addEventListener('click', (event) => {
            if (!select.contains(event.target)) {
                select.classList.remove('open');
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Sélection des éléments
    const openContactModalButton = document.getElementById('openContactModal');
    const modalContact = document.getElementById('modal-contact');
    const closeModalButton = modalContact.querySelector('.close-modal');
    const refPhotoField = document.getElementById('reference_photo'); // Champ "RÉF PHOTO"

    // Ouvrir le modal et pré-remplir la référence
    if (openContactModalButton && modalContact && refPhotoField) {
        openContactModalButton.addEventListener('click', function (e) {
            e.preventDefault(); // Empêche le comportement par défaut du bouton

            // Récupérer la référence de la photo depuis l'attribut data-reference
            const reference = openContactModalButton.getAttribute('data-reference');
            refPhotoField.value = reference; // Injecter la référence dans le champ "RÉF PHOTO"

            modalContact.style.display = 'flex'; // Affiche le modal
        });
    }

    // Fermer le modal avec le bouton de fermeture
    if (closeModalButton && modalContact) {
        closeModalButton.addEventListener('click', function () {
            modalContact.style.display = 'none'; // Cache le modal
        });
    }

    // Fermer le modal si on clique en dehors du contenu
    window.addEventListener('click', function (e) {
        if (e.target === modalContact) {
            modalContact.style.display = 'none'; // Cache le modal
        }
    });
});
//Fonction Photo-Container
document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.getElementById('prev-photo');
    const nextButton = document.getElementById('next-photo');
    const currentPhotoImg = document.getElementById('current-photo');

    // Vérifier que tous les éléments existent
    if (!prevButton || !nextButton || !currentPhotoImg) {
        console.error('Erreur : Un ou plusieurs éléments de navigation sont manquants.');
        return; // Arrêter l'exécution du script
    }

    // Fonction pour charger une photo par son ID via AJAX
    function loadPhotoById(photoId) {
        if (!photoId) {
            console.error('Aucun ID de photo fourni.');
            return; // Arrêter la fonction si l'ID est manquant
        }

        fetch(ajax_params.ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'get_photo_by_id', // Action WordPress pour récupérer la photo
                photo_id: photoId,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Mettre à jour l'image active
                    currentPhotoImg.src = data.data.photo_url;

                    // Mettre à jour les IDs des photos précédentes et suivantes
                    prevButton.setAttribute('data-photo-id', data.data.previous_photo_id || '');
                    nextButton.setAttribute('data-photo-id', data.data.next_photo_id || '');
                } else {
                    console.error('Erreur :', data.data);
                }
            })
            .catch(error => console.error('Erreur AJAX :', error));
    }

    // Gérer le clic sur la flèche précédente
    prevButton.addEventListener('click', function () {
        const previousPhotoId = prevButton.getAttribute('data-photo-id');
        if (previousPhotoId) {
            loadPhotoById(previousPhotoId);
        } else {
            console.error('Aucune photo précédente trouvée.');
        }
    });

    // Gérer le clic sur la flèche suivante
    nextButton.addEventListener('click', function () {
        const nextPhotoId = nextButton.getAttribute('data-photo-id');
        if (nextPhotoId) {
            loadPhotoById(nextPhotoId);
        } else {
            console.error('Aucune photo suivante trouvée.');
        }
    });
});
//Photo Container
document.addEventListener('DOMContentLoaded', function () {
    const prevButton = document.getElementById('prev-photo');
    const nextButton = document.getElementById('next-photo');
    const photoContainer = document.querySelector('.photo-container');
    const mainPhoto = document.getElementById('main-photo');

    // Créer une image pour la photo de survol
    const hoverPhoto = document.createElement('img');
    hoverPhoto.alt = "Photo de survol";
    hoverPhoto.classList.add('photo-hover');
    hoverPhoto.style.opacity = 0; // Cachée par défaut
    photoContainer.appendChild(hoverPhoto);

    // Fonction pour afficher la photo précédente ou suivante dans le photo-container
    function showThumbnail(button) {
        const thumbnailUrl = button.getAttribute('data-thumbnail-url');
        if (thumbnailUrl) {
            hoverPhoto.src = thumbnailUrl; // Change la source de l'image de survol
            hoverPhoto.style.opacity = 1; // Affiche l'image de survol
            mainPhoto.style.opacity = 0; // Cache la photo principale
        }
    }

    // Fonction pour restaurer la photo principale
    function restoreMainPhoto() {
        hoverPhoto.style.opacity = 0; // Cache l'image de survol
        mainPhoto.style.opacity = 1; // Affiche la photo principale
    }

    // Gérer le survol des flèches
    if (prevButton) {
        prevButton.addEventListener('mouseenter', () => showThumbnail(prevButton));
        prevButton.addEventListener('mouseleave', restoreMainPhoto);
        prevButton.addEventListener('click', function (event) {
            event.preventDefault(); // Empêche le comportement par défaut du bouton
            const previousPhotoPermalink = prevButton.getAttribute('data-permalink');
            if (previousPhotoPermalink) {
                window.location.href = previousPhotoPermalink; // Redirige vers la page de la photo précédente
            } else {
                console.error('Aucune photo précédente trouvée.');
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('mouseenter', () => showThumbnail(nextButton));
        nextButton.addEventListener('mouseleave', restoreMainPhoto);
        nextButton.addEventListener('click', function (event) {
            event.preventDefault(); // Empêche le comportement par défaut du bouton
            const nextPhotoPermalink = nextButton.getAttribute('data-permalink');
            if (nextPhotoPermalink) {
                window.location.href = nextPhotoPermalink; // Redirige vers la page de la photo suivante
            } else {
                console.error('Aucune photo suivante trouvée.');
            }
        });
    }
});


