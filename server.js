const express = require('express');

const app = express();

//parse request of content-type: application/json
app.use(express.json());

//parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

//Includes
require("./api/routes/user.routes.js")(app);
require("./api/routes/user.routes.js")(app);

//set port, listen for requests
app.listen(8888, () => {
    console.log("Server is running on port 8888");
});