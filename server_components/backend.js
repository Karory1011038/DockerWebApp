const db = require('./database.js');

function getAllProducts(req, res) {
    db.getAllProducts().then((rows) => {
        res.status(200).send(rows);
    }).catch((err) => {
        console.error(err.message);
        res.status(500).send('Error getting products from the database');
    });
}

module.exports = {
    getAllProducts
}

