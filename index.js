const express = require ("express");
const bodyParser = require("body-parser");
const dbConnection = require ("./config/dbConfigure");
const dbConn = require("./config/dbConfigure");
const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);

});
