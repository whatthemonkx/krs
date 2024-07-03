import { db } from "../db.js";

export const getCategories = (req, res) => {
    const q = `SELECT * FROM store.categories;`;
    db.query(q, [], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addCategories = (req, res) => {
    const q = "INSERT INTO `store`.`categories` (`name`) VALUES (?);";

    db.query(q, [req.body.name], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};