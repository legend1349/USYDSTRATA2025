import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Maintenance request submitted</p>
          <p className="text-sm text-muted-foreground">John Smith submitted a new maintenance request</p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">2 hours ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>SW</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Document uploaded</p>
          <p className="text-sm text-muted-foreground">Sarah Wong uploaded a new document</p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">5 hours ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>MW</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Meeting scheduled</p>
          <p className="text-sm text-muted-foreground">Michael Wong scheduled a committee meeting</p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">Yesterday</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>SJ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Levy payment received</p>
          <p className="text-sm text-muted-foreground">Sarah Johnson made a levy payment</p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">2 days ago</div>
      </div>
    </div>
  )
}

