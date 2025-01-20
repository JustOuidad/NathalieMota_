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
