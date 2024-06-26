const express = require('express');
const router = express.Router();
const z = require('zod');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../routes/middleware');
const {User, Account } = require('../db');
const bcrypt = require('bcrypt');
require('dotenv').config()



const verifySignup = z.object({
  firstname: z.string().max(50),
  lastname: z.string().max(50),
  username: z.string().toLowerCase().max(20),
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

const verifySignin = z.object({
  email: z.string().email().optional(),
  username: z.string().toLowerCase().max(20).optional(),
  password: z.string().min(6).max(20),
})

const verifyUpdateUser = z.object({
  password: z.string().min(6).max(20).optional(),
  firstname : z.string().max(50).optional(),
  lastname: z.string().max(50).optional(),
})

router.post("/signup", async (req, res) => {
  const result = verifySignup.safeParse(req.body);
  
  if (result.success) {
    try {
      const user = await User.findOne({ email: result.data.email , username: result.data.username});
      if (user) {
        res.status(400).json({ error: "Email already taken / Username already taken" });
      } else {
        const newUser = new User(result.data);
        newUser.password = await bcrypt.hash(result.data.password, 10);
        const newAccount = new Account({userId: newUser._id});
        newAccount.balance = Math.floor(Math.random() * 100000);
        
        await newUser.save();
        await newAccount.save();
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET);
        res.json({
          firstname: newUser.firstname,
          message: "User created successfully",
          token: token
        })
      }
    } catch (error) {
      res.status(411).json({ error: "Email already taken / Username already taken" });
    }
  } else {
    res.status(400).send(result.error);
  }
});


router.post("/signin", async (req, res) => {
  const result = verifySignin.safeParse(req.body);
  try {
      if (result.success) {
          let user;
          if (result.data.email) {
              user = await User.findOne({ email: result.data.email });
          } else if (result.data.username) {
              user = await User.findOne({ username: result.data.username });
          }
          if (user) {
              bcrypt.compare(result.data.password, user.password, function(err, resultdata) {
                  if (resultdata) {
                      const token = jwt.sign({ userId: user.username }, process.env.JWT_SECRET);
                      res.json({
                          firstname: user.firstname,
                          message: "User signed in successfully",
                          token: token
                      });
                  } else {
                      res.status(401).json({ message: "Error while logging in" });
                  }
              });
          } else {
              res.status(401).json({ message: "Error while logging in" });
          }
      } else {
          res.status(401).json({ message: "Error while logging in" });
      }
  } catch (error) {
      res.json({ error: "Invalid credentials" });
  }
});


router.put("/",authMiddleware, async (req, res)=>{
  const result = verifyUpdateUser.safeParse(req.body);
  try {
    if(result.success){
      const user =await  User.findOne({ username: req.user.userId });
      if(user){
        user.password = result.data.password;
        user.firstname = result.data.firstname;
        user.lastname = result.data.lastname;
        user.save();
        res.json({ message: "User updated successfully" });
      }
    } else{
      res.status(411).json({
        message: "Error while updating information"
      });
    }
  } catch (error) {
    res.status(401).json({ error: "Error while updating information" });
  }
})

router.get("/users",authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [{
        firstname: {
            "$regex": filter
        }
    }, {
        lastname: {
            "$regex": filter
        }
    }]
})
res.json({
  users: users.map(user =>{
    if(user._id.toString() !== req.user.userId){
      return {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        _id: user._id
      }
    }
    
  })
});
  

})

module.exports = router;