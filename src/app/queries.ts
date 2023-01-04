import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
    mutation LoginMutation {
        login @rest(path: "/login") {
            data {
                token
                expirationDate
            }
        }
    }
`;

export const LOGOUT_MUTATION = gql`
    mutation LogoutMutation {
        logout @rest(path: "/logout") {
            success
            message
        }
    }
`;

export const GETME_QUERY = gql`
    query GetMeQuery {
        getMe @rest(path: "/me") {
            data {
                id
                name
            }
        }
    }
`;
