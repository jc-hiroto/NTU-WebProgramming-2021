import { gql } from "@apollo/client";
const CHATBOX_MSG_QUERY = gql`
  query allMessages($name1: String!, $name2: String!) {
    allMessages(name1: $name1, name2: $name2) {
      sender{
        name
      }
      body
    }
  }
`;

export { CHATBOX_MSG_QUERY };