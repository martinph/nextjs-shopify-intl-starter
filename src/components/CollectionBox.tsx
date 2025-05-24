import clsx from "clsx"
import Image from "next/image"

type CollectionBoxProps = {
    title: string
    image?: {
        url: string
    }
    className?: string
}

export default function CollectionBox({ title, image, className }: CollectionBoxProps) {
  return (
    <div className={clsx("relative flex items-center justify-center w-72 h-64 overflow-hidden", className)}>
      {image && (
        <Image
          src={image.url}
          alt={title}
          width={400}
          height={400}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      <h2 className="relative text-white text-2xl font-bold z-10 bg-black/30 px-4 py-2 rounded">
        {title}
      </h2>
    </div>
  );
}
