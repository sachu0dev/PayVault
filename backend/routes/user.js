const express = require('express');
const router = express.Router();

router.post("/singup", (req, res) => {
  console.log(req.body);
  res.send("hello");
});


module.exports = router;