const { AuthenticationError } = require("apollo-server-express");
const { User, Uac } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("Uac");
    },

    user: async () => {
      return await User.findById().populate("Uac");
    },
    uacs: async () => {
      return await Uac.find().populate("username");
    },
    uac: async (parent, args) => {
      return await Uac.findById(args.uacId).populate("username");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const newUser = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, newUser };
    },

    addUac: async (parent, { uacname, _id }) => {
      const newUac = await Uac.create({ uacname });
      return newUac;
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete(args, { _id: userId });
    },
    removeUac: async (parent, { uacId }) => {
      return Uac.findOneAndDelete(args, { _id: uacId });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect Email or Password");
      }

      const correctPw = await User.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Email or Password");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
