document.querySelectorAll('.photo-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();

        const photoId = this.dataset.photoId;
        console.log("ID de l'image cliquée :", photoId);

        fetch(lightbox_ajax_object.ajax_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=get_photo_data&security=${lightbox_ajax_object.security}&photoId=${photoId}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                openLightbox(data.data);
            } else {
                console.error('Erreur de récupération des données.');
            }
        })
        .catch(() => console.error('Erreur d\'AJAX.'));
    });
});





function openLightbox(photoData) {
    console.log("Ouverture de la lightbox :", photoData);

    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    if (!lightboxOverlay) {
        console.error("La lightbox n'existe pas.");
        return;
    }

    const image = document.querySelector('.lightbox-image');
    const reference = document.querySelector('.lightbox-reference');
    const category = document.querySelector('.lightbox-category');

    if (image && reference && category) {
        image.src = photoData.url;
        reference.textContent = photoData.reference;
        category.textContent = photoData.category;
        lightboxOverlay.dataset.currentPhotoId = photoData.id;
        lightboxOverlay.style.display = 'flex';
    } else {
        console.error("Éléments de la lightbox non trouvés.");
    }
}
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('lightbox-image')) {
        console.log('🖼️ Lightbox activé sur', event.target);
    }
});
