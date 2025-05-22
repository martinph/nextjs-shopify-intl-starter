import { ClientResponse, createStorefrontApiClient } from "@shopify/storefront-api-client";
import { GET_CHECKOUT_URL_QUERY, GET_COLLECTION_QUERY, GET_COLLECTIONS_QUERY, GET_PRODUCT_QUERY, GET_PRODUCTS_QUERY } from "./shopify/queries";

if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
    throw new Error("Missing Shopify Store Domain");
}

const clientInstance = createStorefrontApiClient({
    storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION ?? "2025-07",
    publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_PUBLIC_ACCESS_TOKEN,
});

export const client = clientInstance;

export const getProducts = async <T = unknown>(first: number = 10): Promise<ClientResponse<T>> => {
    return await client.request(GET_PRODUCTS_QUERY, {
        variables: {
            first,
        }
    });
}

export const getProduct = async <T = unknown>(handle: string): Promise<ClientResponse<T>> => {
    return await client.request(GET_PRODUCT_QUERY, {
        variables: {
            handle,
        }
    });
};

export const getCollections = async <T>(first: number = 10, productsFirst: number = 10): Promise<ClientResponse<T>> => {
    return await client.request(GET_COLLECTIONS_QUERY, {
        variables: {
            first,
            productsFirst,
        }
    });
}

export const getCollection = async <T = unknown>(handle: string, first: number = 10): Promise<ClientResponse<T>> => {
    return await client.request(GET_COLLECTION_QUERY, {
        variables: {
            handle,
            first,
        }
    });
}

export const cartCreate = async <T = unknown>(input: any): Promise<ClientResponse<T>> => {
    return await client.request(`
        mutation cartCreate($input: CartInput!) {
            cartCreate(input: $input) {
                cart {
                    id,
                    checkoutUrl
                }
            }
        }
    `, {
        variables: {
            input,
        }
    });
}
