document.addEventListener('DOMContentLoaded', function () {
    const contactLink = document.querySelector('.menu-list li a[href="#contact"]');
    if (contactLink) {
        contactLink.addEventListener('click', function (e) {
            e.preventDefault(); // Empêche le comportement par défaut (clic)
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Ouvre le modal quand on clique sur le lien "Contact"
    const openContactModal = document.querySelector('#menu-item-14');
    
    if (openContactModal) {
        openContactModal.addEventListener('click', function(event) {
            event.preventDefault(); // Empêche la redirection vers une autre page
            document.getElementById('modal-contact').style.display = 'flex'; // Affiche le modal
        });
    }

    // Ferme le modal quand on clique sur l'icône de fermeture (×)
    const closeModalButton = document.querySelector('.cross-icon-modale');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', function() {
            document.getElementById('modal-contact').style.display = 'none'; // Cache le modal
        });
    }

    // Ferme le modal si l'utilisateur clique en dehors du modal (sur le fond)
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('modal-contact')) {
            document.getElementById('modal-contact').style.display = 'none'; // Cache le modal
        }
    });
});
console.log('Script.js chargé avec succès !');

document.getElementById('load-more').addEventListener('click', function() {
    // Récupère toutes les images cachées
    const hiddenItems = document.querySelectorAll('.photo-item.hidden');

    // Affiche les 8 premières images cachées
    for (let i = 0; i < 8 && i < hiddenItems.length; i++) {
        hiddenItems[i].classList.remove('hidden');
    }

    // Si toutes les images sont affichées, cache le bouton
    if (document.querySelectorAll('.photo-item.hidden').length === 0) {
        this.style.display = 'none';
    }
});

document.getElementById('load-more').addEventListener('click', function() {
    var paged = parseInt('<?php echo $paged; ?>') + 1;  // Page suivante
    var data = {
        'action': 'load_more_photos',
        'paged': paged,
    };

    // Requête AJAX pour charger plus de photos
    jQuery.ajax({
        url: '<?php echo admin_url('admin-ajax.php'); ?>',
        data: data,
        type: 'POST',
        success: function(response) {
            if (response) {
                jQuery('.photo-gallery').append(response);  // Ajouter les photos à la galerie
                if (paged >= <?php echo $total_pages; ?>) {
                    jQuery('#load-more').hide();  // Cacher le bouton si toutes les photos sont chargées
                }
            }
        }
    });
});
jQuery(document).ready(function ($) {
    let currentCategorie = $('.filter-categorie').val();
    let currentFormat = $('.filter-format').val();
    let currentOrder = $('.filter-order').val();
  
    function loadMorePhotos(page) { //a travailler pour load more
      $.ajax({
        url: ajaxurl,
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
            $('.photo-grid').html(response);
          } else {
            $('.photo-grid').append(response);
          }
  
          if (
            $('#no-more-posts').length > 0 ||
            $(response).filter('.photo-item').length < 8
          ) {
            $('#load-more').hide();
          } else {
            $('#load-more').show().data('page', page);
          }
        },
      });//logique element
    }
  
      loadMorePhotos(1); // Réinitialiser et charger la première page
    });
  
    $('#load-more').click(function () {
      let page = $(this).data('page') + 1;
      loadMorePhotos(page);
    });
  ;