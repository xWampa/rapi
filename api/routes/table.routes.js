module.exports = app => {
    const tables = require("../controllers/table.controller.js");

    // Create a new Table
    app.post("/tables", tables.create);

    // Retrieve all Table
    app.get("/tables", tables.findAll);

    // Retrieve a single Table with userId
    app.get("/tables/:tableNumber", tables.findOne);

    // Update a Table total with provided tableNumber
    app.put("/tables/:number", tables.update);

    // Delete a Table with userId
    app.delete("/tables/:tableNumber", tables.delete);
    
}