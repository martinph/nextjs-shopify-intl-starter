import Link from "next/link"
import CollectionBox from "./CollectionBox"

type CollectionListProps = {
    items: any[]
}

export default function CollectionList({ items }: CollectionListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-fit mx-auto">
            {items.map((item) => (
                <Link key={item.node.id} href={`store/${item.node.handle}`}>
                    <CollectionBox {...item.node} />
                </Link>
            ))}
        </div>
    )
}