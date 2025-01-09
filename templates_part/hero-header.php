<?php
    // Requête photo format paysage aléatoire
    $args_hero = array(
        'post_type' => 'Photo', 
        'posts_per_page' => 1,
        'orderby' => 'rand',
        
    );

      // Requête photo format paysage aléatoire
      $args_banner = array(
        'post_type' => 'Photo', 
        'posts_per_page' => 1,
        'orderby' => 'rand',
        'tax_query' => array(
            array(
                'taxonomy' => 'formats',
                'field' => 'slug',
                'terms' => 'paysage',
            ),
        ),
    );


    $banner = new WP_Query($args_hero);

    if ($banner->have_posts()) {
        while ($banner->have_posts()) {
            $banner->the_post();
            //  'large' custom size 
            the_post_thumbnail('large');
        }
        wp_reset_postdata();
    }  else {
        echo '<p>Aucune photo trouvée.</p>';
    }
    ?>
    
    <!-- Conteneur pour le texte -->
    <div class="hero-text">
        <h1>Photographe Event</h1>
    </div>
    

