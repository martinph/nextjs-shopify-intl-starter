import CollectionList from "@/components/CollectionList";
import PageHeading from "@/components/ui/PageHeading";
import client from "@/lib/shopify/client";
import { GET_COLLECTIONS_QUERY, GET_PRODUCTS_QUERY } from "@/lib/shopify/queries";

export default async function CollectionsPage() {
    const { data } = await client.query({
        query: GET_COLLECTIONS_QUERY,
        variables: {
            first: 10,
            productsFirst: 10
        }
    })
    return (
        <div>
            <PageHeading className="mb-4">
                <h1>Collections</h1>
                <p className="text-lg">Browse our range of products</p>
            </PageHeading>
            <CollectionList items={data.collections.edges} />
        </div>
    )
}