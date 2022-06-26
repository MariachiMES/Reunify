const Mongoose = require("mongoose");

const auditSchema = new Mongoose.Schema({
  uac: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Uac",
  },
  sponsor_assessment: {
    type: String,
  },
});

const Audit = Mongoose.model("Audit", auditSchema);
module.exports = Audit;
