const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      //useCreateIndex: true,
      //useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log(`MongoDB Connected: ${res.connection.host}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectDB;
