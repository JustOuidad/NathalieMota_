<!-- Modale de contact -->
<div id="modal-contact" class="modal" style="display:none;">
    <div class="modal__content">
        <span class="cross-icon-modale">&times;</span>
        <img class="modal-img" src="http://localhost:10028/wp-content/uploads/2024/12/Contact-header.png" alt="En-tête pop-up Contact">
        <?php
        // Insérer le formulaire de contact
        echo do_shortcode('[contact-form-7 id="b883e7b" title="Contact form 1"]');
        ?>
    </div>
</div>
