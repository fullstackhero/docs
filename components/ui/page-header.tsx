import Balance from "react-wrap-balancer"

import { cn } from "../../libs/utils"

function PageHeader({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <section
            className={cn(
                "flex max-w-[980px] flex-col items-start gap-2 px-4 pt-8 md:pt-12",
                className
            )}
            {...props}
        >
            {children}
        </section>
    )
}

function PageHeaderHeading({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1
            className={cn(
                "text-3xl leading-tight tracking-tighter md:text-7xl lg:leading-[1.1]",
                className
            )}
            {...props}
        />
    )
}

function PageHeaderDescription({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <Balance
            className={cn(
                "max-w-[750px] text-lg text-muted-foreground sm:text-xl",
                className
            )}
            {...props}
        />
    )
}

export { PageHeader, PageHeaderHeading, PageHeaderDescription }