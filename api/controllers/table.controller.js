const Table = require("../models/table.model.js");

// Create and Save a new Table
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    //Create a Table
    const table = new Table({
        number: req.body.number,
        total: req.body.total,
    });

    //Save Table in the DB
    Table.create(table, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Table."
            });
        } else {
            res.send(data);
        }
    });
};

// Retrieve all Tables from the DB
exports.findAll = (req, res) => {
    Table.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving tables."
            });
        } else {
            res.send(data);
        }
    });
};

// Find a single Table with the number
exports.findOne = (req, res) => {
    Table.findByNumber(req.params.tableNumber, (err, data) => {
        if (err) {
            if (err.king == "not_found") {
                res.status(404).send({
                    message: `No table found with number ${req.params.tableNumber}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieveing Table with number ${req.params.tableNumber}`
                });
            }
        } else {
            res.send(data);
        }
    });
};

// Delete a Table with the provided tableNumber
exports.delete = (req, res) => {
    Table.remove(req.params.tableNumber, (err, data) => {
        if (err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No table found with number ${req.params.tableNumber}`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete Table with number ${req.params.tableNumber}`
                });
            }
        } else {
            res.send({ message: "Table was deleted!"});
        }
    });
};