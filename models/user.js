const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
   type: String,
   required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    index: {
      unique: true
    }
  },
  number: {
    type: String
  },
  password: {
      type: String,
      required: [true, 'Password is required']
    },
    taskDetails: {
        type: Array
    }
});
module.exports = mongoose.model('tms_user_detail', userSchema);