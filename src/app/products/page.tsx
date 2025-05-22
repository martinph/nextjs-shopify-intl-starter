import ProductBox from "@/components/ProductBox";
import { client, getCollection, getCollections, getProducts } from "@/lib/shopify";

export default async function ProductsPage() {
    const products = await getProducts<any>();
    const { data } = products;
    return (
        <div>
            {data.products.edges.map((product: any) => (
                <ProductBox 
                    key={product.node.id}
                    id={product.node.variants.edges[0].node.id}
                    name={product.node.title}
                    price={product.node.priceRange.minVariantPrice.amount}
                    imageUrl={product.node.images.edges[0]?.node.originalSrc} // Ensure to handle the case where there might not be an image
                />
            ))}
        </div>
    )
}