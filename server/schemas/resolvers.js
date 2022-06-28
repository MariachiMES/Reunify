const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  Uac,
  ReleaseRequest,
  Sponsor,
  Status,
  Tasks,
  Audit,
} = require("../models");
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
      return await User.findById(userId).populate([
        { path: "uacs", model: "Uac" },
        { path: "team_lead", model: "User" },
      ]);
    },
    uacs: async () => {
      const uac = await Uac.find().populate([
        { path: "casemanager", model: "User" },
        { path: "sponsor", model: "Sponsor" },
      ]);
      console.log(uac);
      return uac;
    },
    uac: async (parent, { uacId }) => {
      const uac = await Uac.findById(uacId).populate([
        {
          path: "casemanager",
          model: "User",
        },
        { path: "sponsor", model: "Sponsor" },
      ]);
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
    //ADD NEW UAC, ASSIGN TO CASE MANAGER
    addUac: async (parent, { uacname, a_number, casemanager }) => {
      const newUac = await Uac.create({
        uacname,
        a_number,
        casemanager,
      });
      const assignedCm = await User.findById(casemanager);
      assignedCm.uacs.push(newUac);
      assignedCm.save();

      const createSponsor = await Sponsor.create({ uac: newUac._id });
      const createTasks = await Tasks.create({ uac: newUac._id });
      const createStatus = await Status.create({ uac: newUac._id });
      const createRelease = await ReleaseRequest.create({ uac: newUac._id });
      const createAudit = await Audit.create({ uac: newUac._id });

      newUac.sponsor = createSponsor._id;
      newUac.tasks = createTasks._id;
      newUac.release_request = createRelease._id;
      newUac.status = createStatus._id;
      newUac.audit = createAudit._id;
      newUac.save();

      return (
        newUac.populate([
          { path: "casemanager", model: "User" },
          { path: "sponsor:", model: "Sponsor" },
          { path: "tasks", model: "Tasks" },
          { path: "release_request", model: "ReleaseRequest" },
          { path: "status", model: "Status" },
          { path: "audit", model: "Audit" },
        ]),
        createSponsor.populate({ path: "uac", model: "Uac" })
      );
    },
    //UPDATE SPONSOR INFO
    updateSponsor: async (
      parent,
      {
        sponsorId,
        name,
        gender,
        relationship,
        phone_number,
        address,
        city,
        state,
        zip,
        adult_caregiver_name,
        adult_caregiver_phone,
        category1,
        category2A,
        category2B,
        category3,
        category4,
      }
    ) => {
      const sponsor = await Sponsor.findByIdAndUpdate(sponsorId, {
        name,
        gender,
        relationship,
        phone_number,
        address,
        city,
        state,
        zip,
        adult_caregiver_name,
        adult_caregiver_phone,
        category1,
        category2A,
        category2B,
        category3,
        category4,
      }).populate();
      console.log(sponsor);
      return sponsor;
    },
    //UPDATE TASKS
    updateTasks: async (
      parent,
      {
        tasksId,
        sponsor_assessment_completed,
        frp_received,
        ari_received,
        proof_of_relationship_received,
        letter_of_designation_received,
        lopc_sent,
        sponsor_background_checks,
        sponsor_id_received,
        sponsor_fingerprints_taken,
        household_member_ids_received,
        household_member_checks,
        sex_offender_checks,
        contacted_caregiver,
        prior_sponsorship_request,
        prior_address_request,
        can_check_request_date,
      }
    ) => {
      const updatedTasks = await Tasks.findByIdAndUpdate(tasksId, {
        tasksId,
        sponsor_assessment_completed,
        frp_received,
        ari_received,
        proof_of_relationship_received,
        letter_of_designation_received,
        lopc_sent,
        sponsor_background_checks,
        sponsor_id_received,
        sponsor_fingerprints_taken,
        household_member_ids_received,
        household_member_checks,
        sex_offender_checks,
        contacted_caregiver,
        prior_sponsorship_request,
        prior_address_request,
        can_check_request_date,
      }).populate();
      console.log(updatedTasks);
      return updatedTasks;
    },
    //UPDATE CASE STATUS
    updateStatus: async (
      parent,
      {
        statusId,
        remanded,
        submitted,
        approved,
        discharged,
        audit_requested,
        audit_status_date,
        last_requested,
        last_seen,
        notes,
      }
    ) => {
      const updatedStatus = await Status.findByIdAndUpdate(statusId, {
        remanded,
        submitted,
        approved,
        discharged,
        audit_requested,
        audit_status_date,
        last_requested,
        last_seen,
        notes,
      }).populate();
      return updatedStatus;
    },

    //UPDATE RELEASE REQUEST
    updateReleaseRequest: async (
      parent,
      {
        releaseRequestId,
        sir,
        sir_narrative,
        list_of_birth_certificates,
        country_narrative,
        criminal_self_disclosure,
        criminal_history,
        sponsor_id_type,
        household_id_list,
        fingerprints_required,
        fingerprint_results,
        can_checks_required,
        can_checks_received,
        can_check_results,
        prior_sponsorship,
        prior_address,
        straight_release,
        post_release_services,
        home_study,
        home_study_narrative,
        caregiver_name,
        release_recommendation,
      }
    ) => {
      const updatedRR = await ReleaseRequest.findByIdAndUpdate(
        releaseRequestId,
        {
          sir,
          sir_narrative,
          list_of_birth_certificates,
          country_narrative,
          criminal_self_disclosure,
          criminal_history,
          sponsor_id_type,
          household_id_list,
          fingerprints_required,
          fingerprint_results,
          can_checks_required,
          can_checks_received,
          can_check_results,
          prior_sponsorship,
          prior_address,
          straight_release,
          post_release_services,
          home_study,
          home_study_narrative,
          caregiver_name,
          release_recommendation,
        }
      ).populate();
      return updatedRR;
    },
    //UPDATE UAC INFO
    updateUac: async (
      parent,
      {
        uacId,
        uacname,
        a_number,
        date_of_birth,
        country_of_origin,
        date_of_intake,
        gender,
      }
    ) => {
      const updatedUac = await Uac.findByIdAndUpdate(uacId, {
        uacname,
        a_number,
        date_of_birth,
        country_of_origin,
        date_of_intake,
        gender,
      }).populate();

      return updatedUac;
    },
    //UPDATE USER INFO
    updateUser: async (
      parent,
      { userId, username, email, password, is_team_lead }
    ) => {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        username,
        email,
        password,
        is_team_lead,
      }).populate();

      return updatedUser;
    },
    //ASSIGN CM TO UAC?????
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
