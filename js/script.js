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
