const Mongoose = require("mongoose");

const releaseRequestSchema = new Mongoose.Schema({
  uac: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Uac",
  },
  sir: {
    type: Number,
  },
  sir_narrative: {
    type: String,
  },
  list_of_birth_certificates: {
    type: String,
  },
  country_narrative: {
    type: String,
  },
  criminal_self_disclosure: {
    type: Boolean,
  },
  criminal_history: {
    type: String,
  },
  sponsor_id_type: {
    type: String,
  },
  household_id_list: {
    type: String,
  },
  fingerprints_required: {
    type: Boolean,
  },
  fingerprint_results: {
    type: String,
  },
  can_checks_required: {
    type: Boolean,
  },
  can_checks_received: {
    type: Date,
  },
  can_check_results: {
    type: String,
  },
  prior_sponsorship: {
    type: Boolean,
  },
  prior_address: {
    type: Boolean,
  },
  straight_release: {
    type: Boolean,
  },
  post_release_services: {
    type: Boolean,
  },
  home_study: {
    type: Boolean,
  },
  home_study_narrative: {
    type: Boolean,
  },
  caregiver_name: {
    type: String,
  },
  release_recommendation: {
    type: String,
  },
});

const ReleaseRequest = Mongoose.model("ReleaseRequest", releaseRequestSchema);

module.exports = ReleaseRequest;
