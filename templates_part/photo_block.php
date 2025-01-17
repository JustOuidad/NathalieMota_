<?php
function create_custom_post_type() {
    register_post_type('Photo', array(
        'labels' => array(
            'name' => 'Photos',
            'singular_name' => 'Photo',
        ),
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'Photo'), // Important pour que l'URL soit bien "/Photo/"
        'supports' => array('title', 'editor', 'thumbnail'), // Active les miniatures
        'taxonomies' => array('photo_champs'), // Associe la taxonomie 'photo_champs'
    ));
}
add_action('init', 'create_custom_post_type');

