const { json } = require("body-parser");
const sql = require("./db.js");

// Constructor
const Product = function(product) {
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
}

Product.create = (newProduct, result) => {
    var name = newProduct.name;
    var price = newProduct.price;
    var category = newProduct.category;

    sql.query(`INSERT INTO products (name, price, category)
        VALUES ('${name}', ${price}, '${category}')`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Producto creado: ", {id: res.insertId, ...newProduct});
            result(null,{id: res.insertId, ...newProduct});
        });
};

Product.findById = (productId, result) =>{
    sql.query(`SELECT * FROM products WHERE id = ${productId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found product: ", res[0]);
            result(null, res[0]);
            return;
        }

        // No Product found
        result({ kind: "not_found" }, null);
    });
};

Product.getAll = result => {
    sql.query("SELECT id, name, FORMAT(price,2) AS price, category FROM products", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("products: ", res);
        result(null, res);
    });
};

Product.updateById = (id, product, result) => {
    sql.query(
        "UPDATE user SET name = ?, price = ?, categoria = ? WHERE id = ?",
        [product.name, product.price, product.category],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                //No product found with the id provided
                result({ kind: "not_found"}, null);
                return;
            }

            console.log("product updated: ", {id: id, ...product});
            result(null, {id: id, ...product});
        }
    );
};

Product.remove = (id, result) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // no product found with that id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

module.exports = Product