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

<header id="site-header" class="site-header">
    <div class="header-container">
        <nav class="main-navigation">
            <!-- Logo -->
            <div class="logo">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/image/Logo.png" alt="Logo">
                </a>
            </div>

            <!-- Menu -->
            <?php
            if ( has_nav_menu( 'Menu' ) ) {  
                wp_nav_menu( array(
                    'theme_location' => 'Menu',  
                    'menu_class'     => 'header-menu', 
                    'container'      => 'ul',          
                ) );
            } 
            ?>

        </nav>
    </div>
</header>
