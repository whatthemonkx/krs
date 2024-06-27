import { db } from "../db.js";

export const getCompleteItemInfo = (req, res) => {
    const q = `
SELECT 
    i.id AS item_id,
    i.name AS item_name,
    i.description AS item_description,
    i.price AS item_price,
    i.itemType AS item_type,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', v.id,
            'name', v.name,
            'sizes', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', s.id,
                        'name', s.name,
                        'quantity', s.quantity
                    )
                )
                FROM sizes s
                WHERE s.variation = v.id
            ),
            'images', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', img.id,
                        'name', img.name
                    )
                )
                FROM images img
                WHERE img.variation = v.id
            )
        )
    ) AS variations
FROM items i
LEFT JOIN variations v ON i.id = v.item
GROUP BY i.id;

    `;
    db.query(q, [], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
