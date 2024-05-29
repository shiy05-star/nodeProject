const express = require("express");
const bodyParser= require("body-parser");
const signupRoutes = require('./src/routes/signup.routes');



const app =express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use('/api/v2/',signupRoutes);


app.listen(port, () => {
   console.log(`Server is listening on port ${port}`);

});
