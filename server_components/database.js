const sqlite3 = require('sqlite3').verbose();

// Initialize the database
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to database.');
        db.run(`CREATE TABLE IF NOT EXISTS products
                (
                    id INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    price REAL NOT NULL,
                    image BLOB,
                    properties TEXT,
                    description TEXT
                );`
        );

        db.run(`CREATE TABLE IF NOT EXISTS admins
                (
                    id
                    INTEGER
                    PRIMARY
                    KEY,
                    name
                    TEXT
                    NOT
                    NULL,
                    id_tg
                    INTEGER
                    NOT
                    NULL
                    UNIQUE
                );`
        );
    }
});


// Export functions for interacting with the database
module.exports = {
    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM products', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },
    addProduct: (name, price, image, properties,description) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO products (name, price, image, properties,description) VALUES (?, ?, ?, ?,?)';
            db.run(query, [name, price, image, properties,description], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
    changeProduct: (newValue, id, field) => {
        return new Promise((resolve, reject) => {
            let query;
            if (field === 'image') {
                query = 'UPDATE products SET image = ? WHERE id = ?';
            } else if (field === 'name') {
                query = 'UPDATE products SET name = ? WHERE id = ?';
            } else if (field === 'price') {
                query = 'UPDATE products SET price = ? WHERE id = ?';
            } else if (field === 'properties') {
                query = 'UPDATE products SET properties = ? WHERE id = ?';
            } else if (field === 'description') {
                query = 'UPDATE products SET description = ? WHERE id = ?';
            } else {
                reject(new Error('Invalid field'));
                return;
            }
            db.run(query, [newValue, id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
    getProduct: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM products WHERE id = ?';
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM products WHERE id = ?';
            db.run(query, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },

    getAllAdmins: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM admins', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },
    addAdmin: async (name, id_tg) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO admins (name, id_tg) VALUES (?, ?)';
            db.run(query, [name, id_tg], function (error) {
                if (error) {
                    reject(error);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    },
    deleteAdmin: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM admins WHERE id = ?';
            db.run(query, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
    getAdmin: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM admins WHERE id = ?';
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    },
    getAdminByTg: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM admins WHERE id_tg = ?';
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    },
}
