const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/reunify",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  console.log("Reunify Database Connected")
);

module.exports = mongoose.connection;
