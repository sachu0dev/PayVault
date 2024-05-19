const jwt = require('jsonwebtoken');


const authMiddleware = (req,res,next)=>{
  const token = req.headers.authorization;
  if(!token){
    res.status(403).send("Unauthorized");
  }else{
    splitToken = token.split(" ");
    jwt.verify(splitToken[1],process.env.JWT_SECRET,(err, user)=>{
      if(err){
        res.status(403).send("Unauthorized");
      }else{
        req.user = user;
        next();
      }
    })
  }
}

module.exports = authMiddleware;