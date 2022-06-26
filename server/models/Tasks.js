const Mongoose = require("mongoose");

const taskSchema = new Mongoose.Schema({
  uac: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Uac",
  },
  sponsor_assessment_completed: {
    type: Date,
  },
  frp_received: {
    type: Date,
  },
  ari_received: {
    type: Date,
  },
  proof_of_relationship_received: {
    type: Date,
  },
  letter_of_designation_received: {
    type: Date,
  },
  lopc_sent: {
    type: Date,
  },
  sponsor_background_checks: {
    type: Date,
  },
  sponsor_id_received: {
    type: Date,
  },
  sponsor_fingerprints_taken: {
    type: Date,
  },
  household_member_ids_received: {
    type: Date,
  },
  household_member_checks: {
    type: Date,
  },
  sex_offender_checks: {
    type: Date,
  },
  contacted_caregiver: {
    type: Date,
  },
  prior_sponsorship_request: {
    type: Date,
  },
  prior_address_request: {
    type: Date,
  },
  can_check_request_date: {
    type: Date,
  },
});

const Tasks = Mongoose.model("Tasks", taskSchema);

module.exports = Tasks;
