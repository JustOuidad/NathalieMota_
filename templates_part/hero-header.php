<?php
    // Requête photo format paysage aléatoire
    $args_hero = array(
        'post_type' => 'Photo', 
        'posts_per_page' => 1,
        'orderby' => 'rand',
        
    );

    $banner = new WP_Query($args_hero);

    if ($banner->have_posts()) {
        while ($banner->have_posts()) {
            $banner->the_post();
            //  'large' custom size 
            the_post_thumbnail('large');
        }
        wp_reset_postdata();
    } 

?>