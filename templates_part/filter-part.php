<div class="filters">
    <!-- Menu déroulant pour Catégorie -->
    <select id="filter-categorie" class="filter-categorie">
        <option value="">Toutes les catégories</option>
        <?php
        $categories = get_terms(array(
            'taxonomy' => 'categorie_devenement', // Remplace par le nom de ta taxonomie pour les catégories
            'hide_empty' => false,
        ));
        foreach ($categories as $categorie) {
            echo '<option value="' . esc_attr($categorie->slug) . '">' . esc_html($categorie->name) . '</option>';
        }
        ?>
    </select>

    <!-- Menu déroulant pour Format -->
    <select id="filter-format" class="filter-format">
        <option value="">Tous les formats</option>
        <?php
        $formats = get_terms(array(
            'taxonomy' => 'format', // Remplace par le nom de ta taxonomie pour les formats
            'hide_empty' => false,
        ));
        foreach ($formats as $format) {
            echo '<option value="' . esc_attr($format->slug) . '">' . esc_html($format->name) . '</option>';
        }
        ?>
    </select>

    <!-- Menu déroulant pour Trier par -->
    <select id="filter-order" class="filter-order">
        <option value="ASC">Trier par : Plus récentes</option>
        <option value="DESC">Trier par : Plus anciennes</option>
    </select>
</div>