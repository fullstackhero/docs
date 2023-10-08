import { BellIcon, CircleIcon, StarIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
function DotNetWebApiProject({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Card className="text-left">
            <CardHeader className="pb-3">
                <CardTitle>.NET Web API</CardTitle>
                <CardDescription>
                    Choose what you want to be notified about.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
                <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <BellIcon className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                        <div className="text-sm font-medium leading-none">Everything</div>
                        <div className="text-sm text-muted-foreground">
                            Email digest, mentions & all activity.
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                        C#
                    </div>
                    <div className="flex items-center">
                        <StarIcon className="mr-1 h-3 w-3" />
                        4k
                    </div>
                    <div>Updated April 2023</div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    Get Started
                </Button>
            </CardFooter>
        </Card>
    )
}

export { DotNetWebApiProject }