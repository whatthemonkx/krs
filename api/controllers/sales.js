import { db } from "../db.js";

export const inputSale = (req, res) => {
    const transactionQuery = "INSERT INTO `store`.`transaction` (`name`, `address1`, `address2`, `zip`, `state`, `email`) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(transactionQuery, [ req.body.name, req.body.address1, req.body.address2, req.body.zip, req.body.state, req.body.email], (err, result) => {
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
  

