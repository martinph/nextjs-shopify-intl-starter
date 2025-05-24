import { extractIdFromGid } from "@/lib/shopify/utils"
import Link from "next/link"
import slugify from "slugify"

type ProductListProps = {
    items: any[],
    className?: string
}

export default function ProductList({ items, className }: ProductListProps) {
    return (
        <div>
            {items.map((item) => (
                <Link href={`/store/some-collection/${slugify(item.node.title, {strict: true})}`}>
                    {item.node.title}
                </Link>
            ))}
        </div>
    )
}