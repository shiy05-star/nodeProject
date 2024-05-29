// const { findAll , createSignup} = require("../controller/signup.controller");
const dbConn = require("../../config/dbConfigure");

// -------get--------w
     const getSignup = async(signupId) =>{
  
        return new Promise((resolve, reject) =>{
            const query = `CALL kodie.usp_get_tbl_sign_up(${signupId})`;
            dbConn.query(query,[signupId], (err, results) =>{
                if (err){
                    return reject(err);
                }
                resolve(results);
            });
        });
}



// -------get/all-------nw
 const getAllSignup=async() =>{
  
    return new Promise((resolve, reject) =>{
        const query = `call kodie.usp_gett_tbl_sign_up()`;
    
        dbConn.query(query, (err, results) =>{
            if (err){
                return reject(err);
            }
            resolve(results);
        });
    });
}
// --create---w
 const createSignup = async(signupName,signupEmail,signupNumber,signupPassword )=>{
 const query = 'CALL kodie.usp_in_tbl_sign_up(?,?,?,?)';
 return new Promise((resolve, reject) =>{
    dbConn.query(query,[signupName, signupEmail,signupNumber,signupPassword], (err, results) =>{
        if (err){
            return reject(err);
        }
        resolve(results);
    }); 

 });
}

// -------update-------w

const updateSignup = async(signupid, signupName, signupEmail, signupNumber,signupPassword) =>{
    const query = 'CALL kodie.usp_update_tbl_sign_up(?,?,?,?,?)';
    return new Promise((resolve, reject) =>{
      dbConn.query(query, [signupid, signupName, signupEmail, signupNumber, signupPassword], (err, result) =>{
        if (err){
            return reject(err);
        }
        resolve(result);
      })
    });
}

// -----delete---



 const deletedById = (signupId) => {
    return new Promise((resolve, reject) => {
      const query =  `CALL kodie.usp_delete_tbl_sign_up(${signupId})`;
   
      dbConn.query(query, (err, results) => {
        if (err) {
          console.error("Error executing query:", err.stack);
          return reject(err);
        }
   
        resolve(results);
      });
    });
  };


module.exports = {
    deletedById,
   getSignup,
   getAllSignup,
   createSignup,
   updateSignup
};