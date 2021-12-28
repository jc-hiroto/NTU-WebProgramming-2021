import { gql } from "@apollo/client";

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: ID!, $status: Status!) {
    updateTask(id: $id, status: $status) {
      id
      title
      content
      dueDate
      status
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      content
      dueDate
      status
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
