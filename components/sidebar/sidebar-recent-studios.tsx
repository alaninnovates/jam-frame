import { projects } from '@/lib/sample-data';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroupLabel,
} from '../ui/sidebar';
import { timeBefore } from '@/lib/time';

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
                                        {timeBefore(project.lastModified)}
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
