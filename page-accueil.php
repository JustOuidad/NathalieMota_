<?php
/* Template Name: Page d'Accueil */
get_header(); 
?>

<!-- Début du Header personnalisé -->
<header class="page-header">
<div class="header-content">
        <!-- Image du titre -->
        <img src="http://localhost:10028/wp-content/uploads/2025/01/Titre-header.png" alt="Photographe Event" class="header-title">
    </div>
</header>
<!-- Fin du Header personnalisé -->

<!-- Début du contenu principal -->
<div class="page-main-content">
    <?php
    while (have_posts()) : the_post();
        the_content(); 
    endwhile;
    ?>
</div>
<!-- Fin du contenu principal -->

<?php get_footer();  ?>
