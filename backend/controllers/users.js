const { db } = require('../database');

const getUsers = (req, res) => {
    const sql = `
        SELECT * FROM admins
    `;
    const users = db.prepare(sql).all();
    res.json(users);
};

module.exports = {
    getUsers
};
