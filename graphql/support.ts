import { gql } from '@apollo/client';

export const SUPPORT_TICKETS = gql`
  query getSupportTickets {
    getSupportTickets {
      id
      subject
      content
      status
      user {
        id
        firstName
        lastName
      }
      created_at
    }
  }
`;

export const CREATE_SUPPORT_TICKETS = gql`
  mutation CreateSupportTicket($subject: String!, $content: String!) {
    createSupportTicket(subject: $subject, content: $content) {
      id
    }
  }
`;
