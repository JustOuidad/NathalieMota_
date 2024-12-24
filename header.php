<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <header id="site-header" class="site-header">
        <div class="header-container">
            <!-- Logo -->
            <div class="logo">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/image/Logo.png" alt="Logo">
                </a>
            </div>

<!-- Menu -->
<nav id="site-navigation" class="main-navigation">
    <ul class="menu">
        <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Accueil</a></li>
        <li><a href="<?php echo esc_url( home_url( '/a-propos' ) ); ?>">À propos</a></li>
        <li><a href="<?php echo esc_url( home_url( '/contact' ) ); ?>">Contact</a></li>
    </ul>
</nav>
        </div>
    </header>

    <div id="content" class="site-content">
