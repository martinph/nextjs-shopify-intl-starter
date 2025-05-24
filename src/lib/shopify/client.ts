import { ApolloClient, createHttpLink, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_ENDPOINT!;
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_TOKEN || '';

const httpLink = createHttpLink({
    uri: endpoint,
});

const authLink = setContext((_, { headers }) => {
    const token = accessToken;
    return {
        headers: {
            ...headers,
            'X-Shopify-Storefront-Access-Token': token || undefined,
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
