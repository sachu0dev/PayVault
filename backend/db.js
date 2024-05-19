
cosnt = mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:sachu@cluster0.ur9rn4z.mongodb.net/PayVault')
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.error('MongoDB Connection Error: ', err);
    process.exit(1);
  });




const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    minLength: 3,
    maxLenght: 20
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
},
  password: {
    type: String,
    required: true
  }

});

const accountSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  balance: {
      type: Number,
      required: true
  }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {User, Account};