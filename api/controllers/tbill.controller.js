const Tbill = require("../models/tbill.model.js");

// Create and Save a new Tbill
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    // Create a Tbill
    const tbill = new Tbill({
        tnumber: req.body.tnumber,
        item: req.body.item,
        units: req.body.units,
        iprice: req.body.iprice,
        total: req.body.total,
    });

    // Save Tbill in the DB
    Tbill.create(tbill, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Tbill."
            });
            else res.send(data);
    });
};

// Retrieve all Tbills from the given table
exports.findOne = (req, res) => {
    Tbill.findTableBill(req.params.tnumber, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `Not Tbills found with table number: ${req.params.tnumber}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retieving Tbills with table number: " + req.params.tnumber
                });
            }
        } else res.send(data);
    });
};

// Retrieve all Tbills from all DB
exports.findAll = (req, res) => {
    Tbill.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tbills."
            });
        } else { 
            res.send(data);
        } 
    });
};

// Update a Tbill identified by the id in the request
exports.update = (req, res) => {
    // Validate request 
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    Tbill.updateById(
        req.params.tbillId,
        new Tbill(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No Tbill found with id ${req.params.tbillId}`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Tbill with id " + req.params.tbillId
                    });
                }

            } else res.send(data);
        }
    );
};

// Delete a Tbill with the specified tbillId in the request
exports.delete = (req, res) => {
    Tbill.remove(req.params.tbillId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No tbill found with id ${req.params.tbillId}`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Tbill with id " + req.params.tbillId
                });
            }
        } else res.send({ message: "Tbill was deleted successfully!"});
    });
};