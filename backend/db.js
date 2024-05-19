
cosnt = mongoose = require('mongoose');
//Set up default mongoose connection
mongoose.connect('mongodb+srv://admin:sachu@cluster0.ur9rn4z.mongodb.net/PayVault', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
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

const User = mongoose.model('User', userSchema);

module.exports = User;