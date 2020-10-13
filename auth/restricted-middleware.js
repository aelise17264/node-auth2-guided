const jwt = require("jsonwebtoken");

const {jwtSecret} = require('../api/config')

module.exports = (req, res, next) => {
  // add code here to verify users are logged in
  
  const token = req.headers.authorization

  if(token){
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if(error){
        //problem w/ the token
        res.status(401).json({message: 'Nobody sits in box 5!'})
      }else{
        //token is valid & has been decoded
        req.jwt = decodedToken
        next()
      }
    })
  }else{
    res.status(401).json({message: 'we need your credentials'})
  }
  
  
};
