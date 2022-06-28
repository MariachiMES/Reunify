import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      username
      email
      _id
      is_team_lead
      team_lead {
        username
        email
      }
      uacs {
        uacname
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;
export const ASSIGN_TEAM_LEAD = gql`
  mutation assignTeamLead($cmUserId: ID!, $teamLeadId: ID!) {
    assignTeamLead(cmUserId: $cmUserId, teamLeadId: $teamLeadId) {
      _id
      username
      email
      team_lead {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation updateRole($cmId: ID!, $is_team_lead: Boolean!) {
    updateRole(cmId: $cmId, is_team_lead: $is_team_lead) {
      username
      email
      password
      is_team_lead
    }
  }
`;

export const ADD_UAC = gql`
  mutation addUac($uacname: String!, $a_number: Int!, $casemanager: ID!) {
    addUac(uacname: $uacname, a_number: $a_number, casemanager: $casemanager) {
      _id
      uacname
      a_number
      casemanager {
        _id
        username
        email
        is_team_lead
      }
    }
  }
`;

export const UPDATE_SPONSOR = gql`
  mutation updateSponsor($sponsorId: ID!, $name: String!, $gender: String!) {
    updateSponsor(sponsorId: $sponsorId, name: $name, gender: $gender) {
      sponsor {
        _id
        name
        gender
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $userId) {
      username
      _id
    }
  }
`;

export const REMOVE_UAC = gql`
  mutation removeUac($uacId: ID!) {
    removeUac(uacId: $uacId) {
      uacname
    }
  }
`;
