import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      is_team_lead
      team_lead {
        _id
        username
        email
      }
      uacs {
        _id
        uacname
        a_number
        sponsor {
          _id
          name
          gender
        }
        tasks {
          _id
        }
        release_request {
          _id
        }
        status {
          _id
        }
        audit {
          _id
        }
      }
      team_members {
        _id
        username
        email
      }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query user($_id: ID!) {
    user(userId: $_id) {
      _id
      username
      email
      password
      is_team_lead
      team_lead {
        _id
        username
        email
      }
      uacs {
        uacname
        a_number
        sponsor {
          _id
          name
        }
      }
    }
  }
`;

export const QUERY_ALL_UACS = gql`
  query uacs {
    uacs {
      _id
      uacname
      a_number
      sponsor {
        _id
        name
        gender
      }
      tasks {
        _id
      }
      release_request {
        _id
      }
      status {
        _id
      }
      audit {
        _id
      }
      casemanager {
        username
        _id
        email
      }
    }
  }
`;

export const QUERY_SINGLE_UAC = gql`
  query uac($uacId: ID!) {
    uac(uacId: $uacId) {
      _id
      uacname
      a_number
      sponsor {
        _id
        name
      }
      tasks {
        _id
      }
      release_request {
        _id
      }
      status {
        _id
      }
      audit {
        _id
      }
      casemanager {
        username
        email
        _id
        team_members {
          username
        }
      }
    }
  }
`;
