// Ouvrir le modal lorsque l'on clique sur le lien "Contact"
document.querySelector('#menu-item-contact a').addEventListener('click', function(event) {
    event.preventDefault(); // Empêcher la redirection
    document.getElementById("contact-modal").style.display = "block"; // Afficher le modal
});

// Fermer le modal lorsque l'on clique sur le "X"
document.getElementsByClassName("close-modal")[0].onclick = function() {
    document.getElementById("contact-modal").style.display = "none"; // Cacher le modal
}

// Fermer le modal si l'on clique en dehors du modal
window.onclick = function(event) {
    if (event.target == document.getElementById("contact-modal")) {
        document.getElementById("contact-modal").style.display = "none"; // Cacher le modal
    }
}
