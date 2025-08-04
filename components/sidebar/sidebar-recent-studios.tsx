import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroupLabel,
} from '../ui/sidebar';

const projects = [
    {
        id: 1,
        title: 'String Quartet - Mozart',
        lastEdited: new Date(),
    },
    {
        id: 2,
        title: 'Jazz Ensemble - Duke Ellington',
        lastEdited: new Date(),
    },
    {
        id: 3,
        title: 'Rock Band - The Beatles',
        lastEdited: new Date(),
    },
    {
        id: 4,
        title: 'Electronic Duo - Daft Punk',
        lastEdited: new Date(),
    },
];

const timeBefore = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
};

export const SidebarRecentStudios = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Recent Studios</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {projects.map((project) => (
                        <SidebarMenuItem key={project.id}>
                            <SidebarMenuButton asChild className="w-full">
                                <a href={`/dashboard/studios/${project.id}`}>
                                    <span className="truncate">
                                        {project.title}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {timeBefore(project.lastEdited)}
                                    </span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};
