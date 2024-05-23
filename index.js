const express = require ("express");
const bodyParser = require("body-parser");
const dbConnection = require ("./config/dbConfigure");
const dbConn = require("./config/dbConfigure");
const app = express();
const dotenv = require ("dotenv");
require("dotenv").config();

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/signup", (req, res) => {
const query = 'select*from kodie.tbl_sign_up';
dbConn.query(query, (err, results)=>{
     //message
     if (err){
        console.error('error executing query:' +err.stack);
        res.status(500).send('error');
        return;
     }
     res.json(results);

});
});



//define port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);

});
