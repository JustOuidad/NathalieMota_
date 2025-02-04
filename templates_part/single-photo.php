<?php
get_header();
?>

<div class="photo-details">
    <h1><?php the_title(); ?></h1>
    <div class="photo-full">
        <?php echo get_the_post_thumbnail(get_the_ID(), 'full'); ?>
    </div>
    <div class="photo-meta">
        <p><strong>Catégorie :</strong> <?php echo get_the_category_list(', '); ?></p>
        <p><strong>Description :</strong> <?php the_content(); ?></p>
    </div>
</div>

<?php
get_footer();
?>
