const { AuthenticationError } = require("apollo-server-express");
const { User, Uac } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      const allUsers = await User.find().populate([
        {
          path: "uacs",
          model: "Uac",
        },
        { path: "team_lead", model: "User" },
        { path: "team_members", model: "User" },
      ]);
      console.log(allUsers);
      return allUsers;
    },

    user: async (parent, { userId }) => {
      return await User.findById(userId);
    },
    uacs: async () => {
      return await Uac.find().populate({ path: "casemanager", model: "User" });
    },
    uac: async (parent, { uacId }) => {
      console.log(uacId);
      const uac = await Uac.findById(uacId).populate({
        path: "casemanager",
        model: "User",
      });
      return uac;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const newUser = await User.create({
        username,
        email,
        password,
      });
      const token = signToken(newUser);
      return token, newUser;
    },
    assignTeamLead: async (parent, { cmUserId, teamLeadId }) => {
      const teamMember = await User.findByIdAndUpdate(cmUserId, {
        team_lead: teamLeadId,
      }).populate({ path: "team_lead", model: "User" });
      const teamLead = await User.findById(teamLeadId);
      teamLead.team_members.push(cmUserId);
      teamLead.save();
      return teamMember, teamLead;
    },

    updateRole: async (parent, { is_team_lead, cmId }) => {
      const updatedTeamLead = await User.findByIdAndUpdate(cmId, {
        is_team_lead: is_team_lead,
      });
      return updatedTeamLead;
    },

    addUac: async (parent, { uacname, a_number, casemanager }) => {
      const newUac = await Uac.create({
        uacname,
        a_number,
        casemanager,
      });
      const assignedCm = await User.findById(casemanager);
      assignedCm.uacs.push(newUac);
      assignedCm.save();
      console.log(assignedCm, newUac);
      return (
        newUac.populate({ path: "casemanager", model: "User" }), assignedCm
      );
    },
    assignCM: async (parent, { userId, uacId }) => {
      const assignedCM = await User.findByIdAndUpdate(userId, {
        uacs: uacId,
      });
      return ` i don't know what this does ${assignedCM};`;
    },
    removeUser: async (parent, { userId }) => {
      return User.findByIdAndDelete(userId);
    },
    removeUac: async (parent, { uacId }) => {
      return Uac.findByIdAndDelete(uacId);
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
