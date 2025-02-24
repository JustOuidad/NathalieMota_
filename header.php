<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<header id="site-header" class="hero">
    <div class="header-container">
        <nav class="main-navigation">
            <!-- Logo -->
            <div class="logo">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/image/Logo.png" alt="Logo">
                </a>
            </div>
            <!-- Menu toggle -->
            <button class="menu-toggle" aria-controls="nav-menu" aria-expanded="false" aria-label="mobile menu" type="button">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </button>

            <!-- Menu -->
          <div class="menu-container">
                <?php
                if ( has_nav_menu( 'Menu' ) ) {  
                    wp_nav_menu( array(
                        'theme_location' => 'Menu',  
                        'menu_class'     => 'header-menu', 
                        'container'      => 'ul',          
                    ) );
                } 
                ?>
                <!-- Lien ou bouton pour ouvrir la modale de contact -->
                <div class="modal-content">
                    <button id="openModalButton">Contact</button>
                </div>
            </div>
            <?php get_template_part('templates_part/contact');?>
        </nav>
    </div>

</header>
<?php wp_footer(); ?>
</body>
</html>
