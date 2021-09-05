module.exports = app => {
    const cash_counts = require("../controllers/cash_count.controller.js");

    // Create a new Cash count
    app.post("/cash_counts", cash_counts.create);

    // Retrieve all Cash counts
    app.post("/cash_counts", cash_counts.findAll);

    // Retrieve a single Cash count with Date
    app.post("/cash_counts/:cashCountDate", cash_counts.findOne);

    // Update a Cash count with cashCountId
    app.post("/cash_counts/:cashCountId", cash_counts.update);

    // Delete a Cash count with cashCountId
    app.post("/cash_counts/:cashCountId", cash_counts.delete);

};