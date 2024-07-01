import { db } from "../db.js";

export const inputSale = (req, res) => {
    const transactionQuery = "INSERT INTO `store`.`transaction` (`name`, `address1`, `address2`, `zip`, `state`, `email`, `totalPrice`) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(transactionQuery, [ req.body.name, req.body.address1, req.body.address2, req.body.zip, req.body.state, req.body.email, req.body.totalPrice], (err, result) => {
        if (err) return res.status(500).json(err);

        const transactionId = result.insertId;
        const items = req.body.items;

        if (!items || items.length === 0) {
        return res.json({ message: "Sale has been created.", transactionId: transactionId });
        }

        const soldItemsQuery = "INSERT INTO `store`.`solditems` (`sizeId`, `quantity`, `transaction`) VALUES (?, ?, ?)";
        
        let completedQueries = 0;
        const errors = [];
        
        items.forEach((item, index) => {
            db.query(soldItemsQuery, [item.sizeId, item.quantity, transactionId], (err, result) => {
                if (err) {
                    errors.push(err);
                }

                const updateQuantityQuery = "UPDATE `store`.`sizes` SET `quantity` = `quantity` - ? WHERE (`id` = ?)";

                db.query(updateQuantityQuery, [item.quantity, item.sizeId], (err, result) => {
                    if (err) { errors.push(err) }
    
                    if (errors.length > 0) {
                        return res.status(500).json({ message: "Error updating item quantity.", errors: errors });
                    } 
                });
                
                completedQueries++;
                
                if (completedQueries === items.length) {
                    if (errors.length > 0) {
                        return res.status(500).json({ message: "Error creating sale items.", errors: errors });
                    } else {
                        return res.json({ message: "Sale has been created.", transactionId: transactionId });
                    }
                }
            });
        });
    });
};

export const getSoldItems = (req, res) => {
    const q = `SELECT * FROM store.solditems`;

    db.query(q, [], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const getTransactions = (req, res) => {
    const q = `SELECT * FROM store.transaction`;

    db.query(q, [], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const getSoldOutSizes = (req, res) => {
    const q = `
    SELECT 
        s.id AS size_id,
        s.name AS size_name,
        s.quantity AS size_quantity,
        v.id AS variation_id,
        v.name AS variation_name,
        i.id AS item_id,
        i.name AS item_name,
        i.description AS item_description,
        i.price AS item_price,
        i.itemType AS item_type,
        p.name AS image
    FROM store.sizes s
    LEFT JOIN store.variations v ON s.variation = v.id
    LEFT JOIN store.items i ON v.item = i.id
    LEFT JOIN store.images p ON v.id = p.variation
    WHERE s.quantity <= 3;   
    `;
  
    db.query(q, [], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };
  