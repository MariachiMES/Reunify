const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    uacs: [Uac]
  }

  type Uac {
    _id: ID
    uacname: String
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
    addUac(uacname: String!): Uac
    login(email: String!, password: String!): Auth
    removeUser(_id: ID!): User
    removeUac(_id: ID!): Uac
  }
`;

module.exports = typeDefs;
