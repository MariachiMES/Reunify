const Mongoose = require("mongoose");

const statusSchema = new Mongoose.Schema({
  uac: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Uac",
  },
  remanded: {
    type: Date,
  },
  submitted: {
    type: Date,
  },
  approved: {
    type: Date,
  },
  discharged: {
    type: Date,
  },
  audit_requested: {
    type: Boolean,
  },
  audit_status_date: {
    type: Date,
  },
  notes: {
    type: String,
  },
});

const Status = Mongoose.model("Status", statusSchema);

module.exports = Status;
