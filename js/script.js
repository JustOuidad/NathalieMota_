document.addEventListener("DOMContentLoaded", function() {
    // Références aux éléments de la modale
    var modal = document.getElementById("modal");
    var closeBtn = document.querySelector(".close-btn");

    // Trouver le lien "Contact" dans le menu
    var contactLink = document.querySelector('.contact-link'); // Sélecteur mis à jour

    // Si le lien existe
    if (contactLink) {
        // Lorsque l'utilisateur clique sur le lien "Contact", ouvrir la modale
        contactLink.addEventListener("click", function(event) {
            event.preventDefault(); // Empêche le comportement par défaut du lien (ne pas recharger la page)
            modal.style.display = "block"; // Affiche la modale
        });
    }

    // Lorsque l'utilisateur clique sur le bouton de fermeture, fermer la modale
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    // Lorsque l'utilisateur clique à l'extérieur de la modale, la fermer
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});
