import { gql } from "@apollo/client";
const CHATBOX_SUBSCRIPTION = gql`
  subscription chatBox($name1: String!, $name2: String!) {
    chatBox(name1: $name1, name2: $name2) {
      mutation
      data{
        sender{
          name
        }
        body
      }
    }
  }
`;

export { CHATBOX_SUBSCRIPTION };