<footer id="site-footer" class="site-footer">
    <?php wp_nav_menu( array(
        'theme_location' => 'footer_menu',
        'menu_class' => 'footer-links',
        'container' => false,
    ) ); ?>

    <?php get_template_part('templates_part/contact.php'); ?> <!-- Appel au fichier modal.php -->
    <script src="<?= get_stylesheet_directory_uri() . '/js/lightbox.js' ?>"></script><!-- Appel au fichier lightbox.php -->
</footer>
