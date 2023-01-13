const db = require('./database.js');
// const models = require("../db/models");



function getAllProducts(req, res) {
    db.getAllProducts().then((rows) => {
        res.status(200).send(rows);
    }).catch((err) => {
        console.error(err.message);
        res.status(500).send('Error getting products from the database');
    });
}

function getProduct(req, res) {
    db.getProduct(req.params.id).then((rows) => {
        res.status(200).send(rows);
    }).catch((err) => {
        console.error(err.message);
        res.status(500).send('Error getting product from the database');
    });
}


module.exports = {
    getAllProducts,
    getProduct,
}

