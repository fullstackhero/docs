import { cn } from "../../libs/utils"
function Section({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <section
            className={cn(
                "p-10",
                className
            )}
            {...props}
        >
            {children}
        </section>
    )
}

export { Section }