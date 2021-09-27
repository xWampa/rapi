module.exports = app => {
    const products = require("../controllers/product.controller.js");

    // Create a new Product
    app.post("/products", products.create);

    // Retrieve all Products
    app.get("/products", products.findAll);

    // Retrieve a single User with userId
    app.get("/products/:productId", products.findOne);

    // Update a User with userId
    app.put("/products/:productId", products.update);
    
    // Update the image of a product
    app.put("/products-img/:productId", products.updateImage);

    // Delete a User with userId
    app.delete("/products/:productId", products.delete);

}