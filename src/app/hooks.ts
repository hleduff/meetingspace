import { useMutation, useQuery } from '@apollo/client';

import { useApolloClient } from './client';
import { GETME_QUERY, LOGIN_MUTATION, LOGOUT_MUTATION } from './queries';

const TOKEN_NAME = 'authToken';

const useAuthToken = () => localStorage.getItem(TOKEN_NAME) || '';

const useLoginMutation = () => useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => localStorage.setItem(TOKEN_NAME, data.login.data.token),
});

const useLogoutMutation = () => useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
        const apolloClient = useApolloClient();

        localStorage.removeItem(TOKEN_NAME);
        apolloClient.clearStore();
    },
});

const useGetMeQuery = () => useQuery(GETME_QUERY);

export {
    useAuthToken,
    useGetMeQuery,
    useLoginMutation,
    useLogoutMutation,
}