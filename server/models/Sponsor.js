const Mongoose = required("mongoose");

const sponsorSchema = new Mongoose.Schema({
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
});

const Sponsor = Mongoose.model("Sponsor", sponsorSchema);

module.exports = Sponsor;
