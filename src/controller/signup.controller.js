const signupModel = require('../model/signup.model');
// const {validationResult }= require('express-validator');

// ---get/one ---w


exports.findOne = async (req, res) => {
  try {
    const signupId = req.body.signupId;
    if (!signupId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User ID is required",
      });
    }

    const results = await signupModel.getSignup(signupId);
    if (results.length === 0 || results[0].length === 0) {
      return res.status(404).json({
        success: true,
        error: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      error: false,
      message: "User fetched successfully",
      data: results [0][0]
    });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};


// ---get/all---pw
exports.findAll = async (req, res) => {
    //  const isActive =  req.body.isActive ;
    try{
        const result = await signupModel.getAllSignup();
        res.status(200).json({
            success: true,
            error: false,
            data: result[0],
            msg: "user find successfully"
        });
    } catch (err){
        console.error('error executing query:' + err.stack);
        res.status(500).send({
            error: false,
            success:true,
            msg: 'Internal server error'
        });
    }
};


// ---create----w

exports.createAll = async (req, res) => {
    const { signupName, signupEmail, signupNumber, signupPassword } = req.body;
    try {
        const result = await signupModel.createSignup(signupName, signupEmail, signupNumber, signupPassword);
        res.status(200).json({
            success: true,
            error: false,
            data: result[0][0],
            msg: "user created successfully"
        });
        
    } catch (err) {
        console.error('error executing query:' + err.stack);
        res.status(500).send({
            error: false,
            success:true,
            msg: 'Internal server error'
        });
    }
};

//-------put---w

exports.updateAll = async (req, res) => {
    const { signupid, signupName, signupEmail, signupNumber, signupPassword } = req.body;
    // console.log("hello");
    try {
        
        const result = await signupModel.updateSignup(signupid, signupName, signupEmail, signupNumber, signupPassword);
        res.status(200).json({
            success: true,
            error: false,
            data: result[0][0], 
            msg: "User updated successfully"
        });

    } catch (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).send({
            error: false,
            success:true,
            msg: 'Internal server error'
        });
    }
};

// ----delete---pw

exports.deleteAll = async (req, res) => {
    try {
      const signupId = req.body.signupId;
         
         if (!signupId) {
          return res.status(400).json({
            success: true,
            error: false,
            message: "User ID is required",
          });
        }
      const results = await signupModel.deletedById(signupId);
      if (results.affectedRows === 0) {
        res.status(404).send("User not found");
        return;
      }
   
      res.status(200).json({
        success: true,
        error: false,
        message: "Successfully deleted",
        
      });
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: true,
      });
    }
  };


