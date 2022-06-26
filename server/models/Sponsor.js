const Mongoose = require("mongoose");

const sponsorSchema = new Mongoose.Schema({
  uac: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Uac",
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  relationship: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  adult_caregiver_name: {
    type: String,
  },
  adult_caregiver_phone: {
    type: String,
  },
  category1: {
    type: Boolean,
  },
  category2A: {
    type: Boolean,
  },
  category2B: {
    type: Boolean,
  },
  category3: {
    type: Boolean,
  },
  category4: {
    type: Boolean,
  },
});

const Sponsor = Mongoose.model("Sponsor", sponsorSchema);

module.exports = Sponsor;
