const express = require('express');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: `${__dirname}/uploads/`,
    filename: (req, file, cb) => {
        //const fileName = `${req.body.imageName}${path.extname(file.originalname)}`;
        const fileName = `${req.body.imageName}`;
        cb(null, fileName);
        
    }
})

const uploadImage = multer({storage}).single('photo')

const app = express();

//parse request of content-type: application/json
app.use(express.json());

//parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

//handle de image folder to view images
app.use('/img', express.static(__dirname + '/uploads/'));

//Includes
require("./api/routes/user.routes.js")(app);
require("./api/routes/product.routes.js")(app);
require("./api/routes/table.routes.js")(app);
require("./api/routes/tbill.routes.js")(app);
require("./api/routes/cash_count.routes.js")(app);

app.post('/image', uploadImage, (req,res) => {
    console.log(req.file);
    if (req.file) return res.json({msg: "uploaded"});
    
    res.send("failed");
});

// app.get('/img/', function(res){
//     res.sendFile();
// })

//set port, listen for requests
app.listen(8888, () => {
    console.log("Server is running on port 8888");
});