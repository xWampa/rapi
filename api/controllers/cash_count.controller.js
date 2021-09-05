const CashCount = require("../models/cash_count.model.js");

// Create and Save a new CashCount
exports.create = (req, res) => {
    CashCount.init((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the CashCount."
            });
            else res.send(data);
    });
};

// Retrieve all CashCounts from the database
exports.findAll = (req, res) => {
    CashCount.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cash counts."
            });
        } else { 
            res.send(data);
        } 
    });
};

// Find a single Cash count with a casCountDate
exports.findOne = (req, res) => {
    CashCount.findByDate(req.params.cashCountDate, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `Not Cash count found with id ${req.params.cashCountDate}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retieving Cash count with id " + req.params.cashCountDate
                });
            }
        } else res.send(data);
    });
};

// Update a Cash count identified by the cashCountDate in the request
exports.update = (req, res) => {
    // Validate request
    if(!req.body){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    CashCount.updateById(
        req.params.cashCountId,
        new CashCount(req.body),
        (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No Cash count found with id ${req.params.cashCountId}`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Cash count with id " + req.params.cashCountId
                    });
                }
            } else res.send(data);
            
        }
    );
};

// Delete a Cash count with the specified cashCountDate in the request
exports.delete = (req, res) => {
    CashCount.remove(req.params.cashCountId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No user found with id ${req.params.cashCountId}`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.cashCountId
                });
            }
        } else res.send({ message: "User was deleted successfully!"});
    });
};