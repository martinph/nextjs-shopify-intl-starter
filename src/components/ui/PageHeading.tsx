import clsx from "clsx"
import { ReactNode } from "react"

type PageHeadingProps = {
    className?: string
    children: ReactNode
}

export default function PageHeading({className, children}: PageHeadingProps) {
    return (
        <div className={clsx("text-4xl bg-gray-100 flex items-center flex-col p-10 justify-center", className)}>
            {children}
        </div>
    )
}