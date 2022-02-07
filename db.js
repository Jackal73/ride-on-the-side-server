const mongoose = require("mongoose");

function connectDB() {

  mongoose.connect('mongodb+srv://Shawn:Yoshi1988@cluster0.kaflr.mongodb.net/RideOnTheSide', {useUnifiedTopology: true, useNewUrlParser: true});

  const connection = mongoose.connection

  connection.on('connected', () => {
    console.log('MongoDB connection established')
  })

    connection.on('error', () => {
      console.log('MongoDB connection error')
  })
};

connectDB();

module.exports = mongoose