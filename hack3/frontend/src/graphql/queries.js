import { gql } from "@apollo/client";

export const GET_TASKS_QUERY = gql`
  query GetTasksQuery {
    tasks {
      id
      title
      content
      dueDate
      status
    }
  }
`;
