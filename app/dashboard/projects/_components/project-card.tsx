import { Button } from '@/components/ui/button';
import { humanizeDuration } from '@/lib/time';
import { Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Calendar, Clock, MoreVertical } from 'lucide-react';

export const ProjectCard = ({
    project,
    className,
}: {
    project: Project;
    className?: string;
}) => {
    return (
        <div
            key={project.id}
            className={cn('bg-card rounded-lg shadow-md p-4', className)}
        >
            <div className="aspect-video relative">
                <img
                    src={project.thumbnail || '/placeholder.svg'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-background/80 text-foreground px-2 py-1 rounded text-xs flex items-center gap-1 backdrop-blur-sm">
                    <Clock className="w-3 h-3" />
                    {humanizeDuration(project.duration)}
                </div>
            </div>
            <div className="flex items-start justify-between mt-4">
                <h2 className="font-medium truncate">{project.title}</h2>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </div>
            <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {project.createdAt.toLocaleDateString()}
            </div>
            <div className="mt-4 flex gap-2">
                <Button variant="default" className="w-full flex-1">
                    Edit
                </Button>
                <Button variant="outline">Share</Button>
            </div>
        </div>
    );
};
