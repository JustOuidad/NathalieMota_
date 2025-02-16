// import Lightbox from './lightbox.js';
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

  //MENU
  document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.menu-toggle');
    const headerMenu = document.querySelector('.header-menu');

    toggleButton.addEventListener('click', function() {
        headerMenu.classList.toggle('active');
    });
});
  
//AJAX pour le LOAD MORE

jQuery(document).ready(function ($) {

  // Exemple de code pour vérifier que jQuery fonctionne
  let currentCategorie = $('.filter-categorie').val();
  let currentFormat = $('.filter-format').val();
  let currentOrder = $('.filter-order').val();
  let page = 1; // Page de départ

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
          },
          success: function (response) {
              console.log('Réponse reçue :', response);
              if (page === 1) {
                  $('.photo-grid').html(response);
              } else {
                  $('.photo-grid').append(response);
              }

              if ($('#no-more-posts').length > 0 || $(response).filter('.photo-item').length < 8) {
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

  // Charger initialement les photos pour la première page
  loadMorePhotos(page);

  // Lors du clic sur "Charger plus", charger la page suivante
  $('#load-more').click(function () {
      let nextPage = $(this).data('page') + 1;
      loadMorePhotos(nextPage);
  });
});
jQuery(document).ready(function ($) {
    let currentCategorie = '';
    let currentFormat = '';
    let currentOrder = 'ASC';
    let page = 1;

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
            },
            success: function (response) {
                if (page === 1) {
                    $('.photo-grid').html(response); // Remplace le contenu pour la première page
                } else {
                    $('.photo-grid').append(response); // Ajoute les nouvelles photos
                }

                // Masquer le bouton "Charger plus" s'il n'y a plus de photos
                if ($('#no-more-posts').length > 0 || $(response).filter('.photo-item').length < 16) {
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
        loadMorePhotos(page); // Recharger les photos
    });

    // Événement pour le bouton "Charger plus"
    $('#load-more').click(function () {
        let nextPage = $(this).data('page') + 1;
        loadMorePhotos(nextPage);
    });
});
console.log('ok');
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

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des fonctionnalités
    initLoadMore();
    initLightbox();
});

// Fonction pour gérer le "load more"
function initLoadMore() {
    const loadMoreButton = document.querySelector('.load-more');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function(event) {
            event.preventDefault();
            loadMorePosts();
        });
    }
}

// Fonction pour charger plus de posts via AJAX
function loadMorePosts() {
    const paged = ajax_params.paged || 1; // Récupère la page actuelle
    const ajaxurl = ajax_params.ajaxurl; // URL pour les requêtes AJAX

    fetch(ajaxurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=filter&paged=${paged}`, // Envoie la page actuelle au serveur
    })
    .then(response => response.text())
    .then(data => {
        // Ajoute les nouveaux posts à la page
        document.querySelector('.photo-container').insertAdjacentHTML('beforeend', data);
        // Met à jour le numéro de page
        ajax_params.paged = parseInt(paged) + 1;
    })
    .catch(error => console.error('Erreur lors du chargement des posts :', error));
}

// Fonction pour initialiser la lightbox
function initLightbox() {
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    lightboxTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function(event) {
            event.preventDefault();
            const imageUrl = this.getAttribute('href');
            openLightbox(imageUrl);
        });
    });
}

// Fonction pour ouvrir la lightbox
function openLightbox(imageUrl) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageUrl}" alt="Lightbox Image">
            <span class="close-lightbox">&times;</span>
        </div>
    `;
    document.body.appendChild(lightbox);

    const closeButton = lightbox.querySelector('.close-lightbox');
    closeButton.addEventListener('click', function() {
        lightbox.remove();
    });
}