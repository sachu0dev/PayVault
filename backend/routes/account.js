const express = require('express');
const router = express.Router();
const z = require('zod');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../routes/middleware');
const {User, Account } = require('../db');
const mongoose = require('mongoose');

const verifyTransfer = z.object({
  to: z.string(),
  amount: z.number(),
});


router.get("/balance",authMiddleware, async (req, res) => {
  const userId = req.user.userId
  
  const account = await Account.findOne({userId: userId});
  res.json({balance: account.balance})
}
)

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = verifyTransfer.parse(req.body);
    const fromAccount = await Account.findOne({userId: req.user.userId});
    if(fromAccount.balance >= result.amount){
      const toAccount = await Account.findOne({userId: result.to});
      fromAccount.balance -= result.amount;
      toAccount.balance += result.amount;
      await fromAccount.save();
      await toAccount.save();
      res.json({message: "Transfer successful"});
    } else {
      res.status(400).json({ message: "Insufficient balance" });
    }
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    res.status(400).send({
      error : "something went wrong"
    });
  } finally {
    session.endSession();
  }
})

module.exports = router