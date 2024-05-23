const express = require("express");                                          
const app = express();
const {User} = require('./db.js');
const cors = require('cors');
require('dotenv').config()

app.use(express.json());
app.use(cors({
  origin: "https://pay-vault-frontend.vercel.app/"
}));

const rootRouter = require('./routes/index');

app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
