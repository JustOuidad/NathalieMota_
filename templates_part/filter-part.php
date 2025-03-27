<div class="filters">
    <!-- Filtres à gauche (CATÉGORIES et FORMATS) -->
    <div class="filters-left">
        <!-- Menu déroulant pour Catégorie (Taxonomie WordPress) -->
        <select id="filter-categorie" class="filter-categorie">
            <option value="">CATÉGORIES</option>
            <?php
            $categories = get_terms([
                'taxonomy' => 'categorie',
                'hide_empty' => false, // Affiche même les catégories non utilisées
            ]);

            if (!empty($categories) && !is_wp_error($categories)) {
                foreach ($categories as $categorie) {
                    echo '<option value="' . esc_attr($categorie->slug) . '">' . esc_html($categorie->name) . '</option>';
                }
            } else {
                echo '<option value="">Aucune catégorie trouvée</option>';
            }
            ?>
        </select>

        <!-- Menu déroulant pour Format (Taxonomie WordPress) -->
        <select id="filter-format" class="filter-format">
            <option value="">FORMATS</option>
            <?php
            $formats = get_terms([
                'taxonomy' => 'formats',
                'hide_empty' => false,
            ]);

            if (!empty($formats) && !is_wp_error($formats)) {
                foreach ($formats as $format) {
                    echo '<option value="' . esc_attr($format->slug) . '">' . esc_html($format->name) . '</option>';
                }
            } else {
                echo '<option value="">Aucun format trouvé</option>';
            }
            ?>
        </select>
    </div>


    <!-- Filtre à droite (TRIER PAR) -->
    <div class="filters-right">
        <!-- Menu déroulant pour Trier par -->
        <select id="filter-order" class="filter-order">
            <option value="">TRIER PAR</option>
            <option value="ASC">Plus récents</option>
            <option value="DESC">Plus anciens</option>
        </select>
    </div>
</div>