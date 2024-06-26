const { db } = require('../database');

const getCompleteItemInfo = (req, res) => {
    const sql = `
    WITH item_variations AS (
        SELECT 
            i.id AS item_id,
            i.name AS item_name,
            i.description AS item_description,
            i.price AS item_price,
            i.itemType AS item_type,
            v.id AS variation_id,
            v.name AS variation_name
        FROM 
            items i
            LEFT JOIN variations v ON i.id = v.item
    ),
    variation_sizes AS (
        SELECT
            iv.item_id,
            iv.item_name,
            iv.item_description,
            iv.item_price,
            iv.item_type,
            iv.variation_id,
            iv.variation_name,
            s.id AS size_id,
            s.name AS size_name,
            s.quantity AS size_quantity
        FROM 
            item_variations iv
            LEFT JOIN sizes s ON iv.variation_id = s.variation
    ),
    variation_images AS (
        SELECT
            ivs.item_id,
            ivs.item_name,
            ivs.item_description,
            ivs.item_price,
            ivs.item_type,
            ivs.variation_id,
            ivs.variation_name,
            ivs.size_id,
            ivs.size_name,
            ivs.size_quantity,
            img.id AS image_id,
            img.name AS image_name
        FROM 
            variation_sizes ivs
            LEFT JOIN images img ON ivs.variation_id = img.variation
    )
    SELECT 
        *
    FROM 
        variation_images
    ORDER BY 
        item_id, variation_id, size_id, image_id;
    `;

    const result = db.prepare(sql).all();

    const items = {};
    result.forEach(row => {
        const {
            item_id, item_name, item_description, item_price, item_type,
            variation_id, variation_name, size_id, size_name, size_quantity, image_id, image_name
        } = row;

        if (!items[item_id]) {
            items[item_id] = {
                id: item_id,
                name: item_name,
                description: item_description,
                price: item_price,
                itemType: item_type,
                variations: {}
            };
        }

        if (!items[item_id].variations[variation_id]) {
            items[item_id].variations[variation_id] = {
                id: variation_id,
                name: variation_name,
                sizes: {},
                images: []
            };
        }

        if (size_id && !items[item_id].variations[variation_id].sizes[size_id]) {
            items[item_id].variations[variation_id].sizes[size_id] = {
                id: size_id,
                name: size_name,
                quantity: size_quantity
            };
        }

        if (image_id) {
            items[item_id].variations[variation_id].images.push({
                id: image_id,
                name: image_name
            });
        }
    });

    const hierarchicalItems = Object.values(items).map(item => {
        item.variations = Object.values(item.variations).map(variation => {
            variation.sizes = Object.values(variation.sizes);
            return variation;
        });
        return item;
    });

    res.json(hierarchicalItems);
};

module.exports = {
    getCompleteItemInfo
};
