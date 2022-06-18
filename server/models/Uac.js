const Mongoose = require("mongoose");

const uacSchema = new Mongoose.Schema({
  uacname: {
    type: String,
    required: true,
  },
  a_number: {
    type: Number,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  country_of_origin: {
    type: String,
    required: true,
  },
  date_of_intake: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  sponsor: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Sponsor",
  },
  status: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  tasks: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Tasks",
  },
  release_request: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "ReleaseRequest",
  },
});

const Uac = Mongoose.model("Uac", uacSchema);

module.exports = Uac;
