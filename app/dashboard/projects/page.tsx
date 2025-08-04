import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from './_components/project-card';
import { projects } from '@/lib/sample-data';

export default async function ProjectsPage() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-6 md:p-10">
                <h1 className="text-2xl font-bold mb-6">Projects</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                    <Link
                        href="/dashboard/studio/create"
                        className="border rounded-lg flex flex-col items-center justify-center p-8 h-full min-h-[250px] hover:bg-muted transition-colors"
                    >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Plus className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-medium">Create New Project</h3>
                    </Link>
                </div>
            </div>
        </div>
    );
}
