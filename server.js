const express = require("express");
const bodyParser = require("body-parser");
const dbConn = require("./config/dbConfigure");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();

const { body, param, validationResult } = require('express-validator');

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());




app.get("/api", (req, res) => {
   const query = 'select*from kodie.tbl_sign_up';
   dbConn.query(query, (err, results) => {
      //message
      if (err) {
         console.error('error executing query:' + err.stack);
         res.status(500).send('error');
         return;
      }
      res.json(results);

   });
});


//---get method-----work
app.get("/user_signup/:id", (req, res) => {
   const signupId = req.params.id;
   const query = `call kodie.usp_get_tbl_sign_up(${signupId})`

   dbConn.query(query, [signupId], (err, results) => {
      //message
      if (err) {
         console.error('error executing query:' + err.stack);
         res.status(500).send('error');
         return;
      }
      if (results.affectedRows === 0) {
         res.status(404).send("user_signup not found");
         return;
      }
      res.json(results);

   });
});

//  -----post method---work
app.post("/user/post", (req, res) => {
   const signupName = req.body.signupName;
   const signupEmail = req.body.signupEmail;
   const  signupNumber = req.body.SignupNumber;
   const signupPassword=req.body.Signuppassword;
   console.log("qwerty");
   const query = `call kodie.usp_in_tbl_sign_up(?,?,?,?)`;
   
   const result=dbConn.query(query, [signupName, signupEmail, signupNumber,signupPassword ], (err, results) => {
      console.log(result,"asasas");
       
      if (err) {
         console.error('Error executing query: ' + err.stack);
         res.status(500).json({ error: "Internal server error" });
         return;
      }
      
      res.json({message: "done"});
   });
});

//user/delete/work

app.delete("/user/delete/:id", [
    // Validate 
    param('id').isInt().withMessage('ID must be an integer')
], (req, res) => {
    // Check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.id;
    const query = `CALL kodie.usp_delete_tbl_sign_up(?)`;
    const result = dbConn.query(query, [userId], (err, results) => {
        console.log("shivaanni")

        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Error executing query');
        }
        if (results && results.length > 0 && results[0] && results[0].length > 0 && results[0][0] && results[0][0].result) {
            console.log(results[0][0].result, "successful");
        } else {
            console.log("No result found");
        }

        res.json({ "message": results.result });
    });
});

// ---put method----work

app.put("/user/put/:id", (req, res) => {
   const signupId =  req.params.id;
   const signupName = req.body.signupName;
   const signupEmail = req.body.signupEmail;
   const  signupNumber = req.body.signupNumber;
   const signupPassword=req.body.signuppassword;
   console.log("qwerty");
   const query = ' CALL kodie.usp_update_tbl_sign_up(?,?,?,?,?)';
   // const query = 'UPDATE kodie.usp_update_tbl_sign_up SET(?, ?, ?,?,?,?, ?) WHERE signupId=?';
   const result=dbConn.query(query, [signupId,signupName, signupEmail, signupNumber,signupPassword], (err, results) => {
      console.log(result,"put method");
       
      if (err) {
         console.error('Error executing query: ' + err.stack);
         res.status(500).json({ error: "Internal server error" });
         return;
      }
      
      res.json({message: "updated"});
   });
});





//define port
app.listen(port, () => {
   console.log(`Server is listening on port ${port}`);

});
