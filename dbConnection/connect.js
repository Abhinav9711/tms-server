const mongoose = require('mongoose');

const connectDb = async() => {
  return await mongoose.connect(process.env.MONGODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

module.exports = { 
  connectDb
}