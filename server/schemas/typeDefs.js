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
  }

  type Uac {
    _id: ID
    uacname: String
    a_number: Int
    casemanager: User
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
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    addUac(uacname: String!, a_number: Int!, casemanager: ID!): Uac
    assignCM(userId: String!, uacId: String!): User
    assignTeamLead(cmUserId: ID!, teamLeadId: ID!): User
    login(email: String!, password: String!): Auth
    removeUser(_id: ID!): User
    removeUac(_id: ID!): Uac
    updateRole(cmId: ID!, is_team_lead: Boolean!): User
  }
`;

module.exports = typeDefs;
