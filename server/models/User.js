const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UAC = require("./Uac");

const userSchema = new Mongoose.Schema({
  is_team_lead: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  uacs: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Uac",
    },
  ],

  team_lead: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    validate: {
      validator: function (v) {
        return is_team_lead.test(v);
      },
    },
  },
  team_members: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

//Hooks

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = Mongoose.model("User", userSchema);

module.exports = User;
