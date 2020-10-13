const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, checkRole('admin'), (req, res) => {
  Users.find()
    .then(users => {
     
      res.status(200).json({users, jwt: req.jwt});
      
    })
    .catch(err => res.send(err));
});

//write the checkRole() function to only allow access 
//if the role in the token matches the role passed as an agrument
//when we invoke this function it should return middlewear that we can use
function checkRole(role){
  return function(req,res,next){
    //next()
    if(req.jwt.role === role){
      next()
    }else{
      res.status(403).json({message: 'you are not an admin'})
    }
}
}

module.exports = router;
