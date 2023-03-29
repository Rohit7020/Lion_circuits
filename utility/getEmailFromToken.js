
var jwt = require('jsonwebtoken');

 async function getEmailFromToken(token){
  
   let email =jwt.verify(token, process.env.SECRET, function(err, decoded) {
                let email=decoded.email
        return email   
        
        });
        console.log("email", email)
        return email
        
        
        }
module.exports={getEmailFromToken}