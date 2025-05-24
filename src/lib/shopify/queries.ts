import { gql } from "@apollo/client";

export const GET_PRODUCTS_QUERY = gql`
    query getProducts($first: Int) {
        products(first: $first) {
            edges {
                node {
                    id
                    title
                    description
                    images(first: 1) {
                        edges {
                            node {
                                originalSrc
                            }
                        }
                    }
                    variants(first: 1) {
                        edges {
                            node {
                                id
                                title
                                priceV2 {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                    priceRange {
                        minVariantPrice {
                            amount
                            currencyCode
                        }
                    }
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
        }
    }
`;
export const GET_PRODUCT_QUERY = gql`
    query getProduct($handle: String!) {
        product(handle: $handle) {
            id
            title
            description
            images(first: 1) {
                edges {
                    node {
                        originalSrc
                    }
                }
            }
            variants(first: 1) {
                    edges {
                        node {
                            id
                            title
                            priceV2 {
                                amount
                                currencyCode
                            }
                        }
                    }
                }
            priceRange {
                minVariantPrice {
                    amount
                    currencyCode
                }
            }
        }
    }`;

export const GET_COLLECTIONS_QUERY = gql`
    query getCollections($first: Int, $productsFirst: Int) {
        collections(first: $first) {
            edges {
                node {
                    id
                    handle
                    title
                    description
                    image {
                        id
                        url
                    }
                    products(first: $productsFirst) {
                        edges {
                            node {
                                id
                                title
                                description
                                images(first: 1) {
                                    edges {
                                        node {
                                            originalSrc
                                        }
                                    }
                                }
                                priceRange {
                                    minVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                        }
                    }
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
        }
    }
`;
export const GET_COLLECTION_QUERY = gql`
    query getCollection($handle: String!, $first: Int) {
        collection(handle: $handle) {
            id
            title
            description
            image {
                url
            }
            products(first: $first) {
                edges {
                    node {
                        id
                        title
                        description
                        images(first: 1) {
                            edges {
                                node {
                                    originalSrc
                                }
                            }
                        }
                        priceRange {
                            minVariantPrice {
                                amount
                                currencyCode
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const GET_CHECKOUT_URL_QUERY = gql`
    query checkoutURL($cartId: ID!) {
        cart(id: $cartId) {
            checkoutUrl
        }
    }
`