const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    is_team_lead: Boolean
    team_lead: User
    uacs: [Uac]
    team_members: [User]
  }
  type Audit {
    _id: ID
    uac: Uac
    sponsor_assessment: String
  }
  type Tasks {
    _id: ID
    uac: Uac
    sponsor_assessment_completed: String
    frp_received: String
    ari_received: String
    proof_of_relationship_received: String
    letter_of_designation_received: String
    lopc_sent: String
    sponsor_background_checks: String
    sponsor_id_received: String
    sponsor_fingerprints_taken: String
    household_member_ids_received: String
    household_member_checks: String
    sex_offender_checks: String
    contacted_caregiver: String
    prior_sponsorship_request: String
    prior_address_request: String
    can_check_request_date: String
  }

  type Status {
    _id: ID
    uac: Uac
    remanded: String
    submitted: String
    approved: String
    discharged: String
    audit_requested: Boolean
    audit_status_date: String
    last_requested: String
    last_seen: String
    notes: String
  }

  type ReleaseRequest {
    _id: ID
    uac: Uac
    sir: Int
    sir_narrative: String
    list_of_birth_certificates: String
    country_narrative: String
    criminal_self_disclosure: String
    criminal_history: String
    sponsor_id_type: String
    household_id_list: String
    fingerprints_required: Boolean
    fingerprint_results: String
    can_checks_required: Boolean
    can_checks_received: String
    can_check_results: String
    prior_sponsorship: Boolean
    prior_address: Boolean
    straight_release: Boolean
    post_release_services: Boolean
    home_study: Boolean
    home_study_narrative: String
    caregiver_name: String
    release_recommendation: String
  }

  type Sponsor {
    _id: ID
    name: String
    gender: String
    relationship: String
    phone_number: String
    address: String
    city: String
    state: String
    zip: String
    adult_caregiver_name: String
    adult_caregiver_phone: String
    category1: Boolean
    category2A: Boolean
    category2B: Boolean
    category3: Boolean
    category4: Boolean
  }

  type Uac {
    _id: ID
    uacname: String
    a_number: Int
    date_of_birth: String
    country_of_origin: String
    date_of_intake: String
    gender: String
    casemanager: User
    sponsor: Sponsor
    tasks: Tasks
    status: Status
    release_request: ReleaseRequest
    audit: Audit
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    uacs: [Uac]
    uac(uacId: ID!): Uac
    sponsor(sponsorId: ID!): Sponsor
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    addUac(uacname: String!, a_number: Int!, casemanager: ID!): Uac
    assignCM(userId: String!, uacId: String!): User
    assignTeamLead(cmUserId: ID!, teamLeadId: ID!): User
    login(email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    removeUac(uacId: ID!): Uac
    updateRole(cmId: ID!, is_team_lead: Boolean!): User
    updateSponsor(sponsorId: ID!, name: String!, gender: String!): Uac
  }
`;

module.exports = typeDefs;
