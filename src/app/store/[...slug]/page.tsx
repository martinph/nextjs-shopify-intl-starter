import ProductList from "@/components/ProductList";
import PageHeading from "@/components/ui/PageHeading";
import client from "@/lib/shopify/client";
import { GET_COLLECTION_QUERY } from "@/lib/shopify/queries";
import Image from "next/image";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string[]}>
}) {
    const { slug } = await params;
    
    if (slug.length === 1) {
        const { data } = await client.query({
            query: GET_COLLECTION_QUERY,
            variables: {
                handle: slug[0],
                first: 10
            }
        });
        return (
            <div>
                <PageHeading className="relative">
                    <div className="relative z-10 text-center">
                        <h1>{data.collection.title}</h1>
                        <p className="text-base">{data.collection.description}</p>
                    </div>
                    <Image src={data.collection.image.url} width={1000} height={1000} alt={data.collection.title} className="absolute inset-0 w-full h-full object-cover z-0 opacity-25" />
                </PageHeading>
                <ProductList items={data.collection.products.edges} />
            </div>
        )
    } else {
        return (
            <div>product page</div>
        )
    }
}