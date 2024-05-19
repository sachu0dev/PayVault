const express = require('express');
const router = express.Router();
const z = require('zod');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../routes/middleware');
const {User, Account } = require('../db');


router.get("/balance",authMiddleware, async (req, res) => {
  const userId = req.user.userId
  const account = await Account.findOne({userId: userId});
  res.json({balance: account.balance})
}
)

router.post("transfer", authMiddleware, async (req, res) => {
  
})

module.exports = router