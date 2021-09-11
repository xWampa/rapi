module.exports = app => {
    const tbills = require("../controllers/tbill.controller.js");

    // Create a new Tbill
    app.post("/tbills", tbills.create);

    // Retrieve all Tbills
    app.get("/tbills", tbills.findAll);

    // Retrieve Tbills from a table with tableNumber
    app.get("/tbills/:tnumber", tbills.findOne);

    // Update a Tbill with tbillId
    app.put("/tbills/:tbillId", tbills.update);

    // Delete a Tbill with tnumber
    app.delete("/tbills/:tnumber", tbills.delete);
}