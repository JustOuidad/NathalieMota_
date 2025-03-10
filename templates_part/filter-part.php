<div class="filters">
    <!-- Filtres à gauche (CATÉGORIES et FORMATS) -->
    <div class="filters-left">
        <!-- Menu déroulant pour Catégorie -->
        <select id="filter-categorie" class="filter-categorie">
            <option value="">CATÉGORIES</option>
            <?php
            $field = get_field_object('field_677d4676f5f3b'); // Récupère le champ ACF
            $categories = $field['choices']; // Les choix du champ ACF

            if (!empty($categories) && !is_wp_error($categories)) {
                foreach ($categories as $value => $label) {
                    echo '<option value="' . esc_attr($value) . '">' . esc_html($label) . '</option>';
                }
            } else {
                echo '<option value="">Aucune catégorie trouvée</option>';
            }
            ?>
        </select>

        <!-- Menu déroulant pour Format -->
        <select id="filter-format" class="filter-format">
            <option value="">FORMATS</option>
            <?php
            $field_format = get_field_object('field_677d46bff5f3d'); // Récupère le champ ACF pour les formats
            $formats = $field_format['choices']; // Les choix du champ ACF

            if (!empty($formats) && !is_wp_error($formats)) {
                foreach ($formats as $value => $label) {
                    echo '<option value="' . esc_attr($value) . '">' . esc_html($label) . '</option>';
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