const Mongoose = require("mongoose");

const uacSchema = new Mongoose.Schema({
  uacname: {
    type: String,
  },
  a_number: {
    type: Number,
    validate: {
      validator: function (v) {
        return /\d\d\d\d\d\d\d\d\d/.test(v);
      },
      message: `Not a valid A Number`,
    },
    unique: [true, "UAC already exists"],
  },
  date_of_birth: {
    type: Date,
  },
  country_of_origin: {
    type: String,
  },
  date_of_intake: {
    type: Date,
  },
  gender: {
    type: String,
  },
  audit: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Audit",
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
  casemanager: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Uac = Mongoose.model("Uac", uacSchema);
module.exports = Uac;
