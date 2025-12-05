import { GraphQLClient } from 'graphql-request';

const SPACEX_GRAPHQL_ENDPOINT = 'https://spacex-production.up.railway.app/';

export const graphqlClient = new GraphQLClient(SPACEX_GRAPHQL_ENDPOINT);
