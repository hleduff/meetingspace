
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

import { useAuthToken } from './hooks';

// allows usage of GraphQL on a REST API
const restLink = new RestLink({ uri: import.meta.env.VITE_URL_API });

// if it exists, set Bearer token for any subsequent requests
const authMiddleware = (authToken: string | ((authToken: string) => void)) =>
    new ApolloLink((operation, forward) => {
        if (authToken) {
            operation.setContext((request: { operationName: string; }, headers: any) => {
                // no need to set Bearer token for login
                if (request.operationName === 'LoginMutation') return;

                return {
                    headers: {
                        ...headers,
                        authorization: `Bearer ${authToken}`,
                    }
                }
            });
        }

        return forward(operation);
    });

export const useApolloClient = () => {
    const authToken = useAuthToken();

    console.log(authToken);

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: authMiddleware(authToken).concat(restLink),
    });
};
