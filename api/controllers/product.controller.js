const Product = require("../models/product.model.js");
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    //Create a Product
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    });

    // Save Product in the database
    Product.create(product, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Product."
            });
        } else {
            res.send(data);
        }
    });
}

// Retrieve all Products from the database
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving products."
            });
        } else {
            res.send(data);
        }
    });
}

// Find a single Product with the productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `No Product found with id ${req.params.productId}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Product with id ${req.params.productId}`
                });
            }
        } else {
            res.send(data);
        }
    });
}

// Update a Product identified by the productId
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    Product.updateById(
        req.params.productId,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No product found with id ${req.params.productId}`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating Product with id ${req.params.productId}`
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
}

// Delete a Product with the provided productId
exports.delete = (req, res) => {
    Product.remove(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No product found with id ${req.params.productId}`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete Product with id ${req.params.productId}`
                });
            }
        } else {
            res.send({ message: "Product was deleted!"});
        }       
    });
}