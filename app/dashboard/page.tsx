import { redirect } from 'next/navigation';

import { LogoutButton } from '@/components/logout-button';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { projects } from '@/lib/sample-data';
import { ProjectCard } from './projects/_components/project-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default async function ProtectedPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/auth/login');
    }

    return (
        <div className="flex flex-col h-svh w-full p-6 gap-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">
                    Hello, {data.user.email?.split('@')[0] || 'User'}
                </h1>
            </header>
            <div>
                <Link href="/dashboard/create-project">
                    <Button>
                        <Plus />
                        Create Project
                    </Button>
                </Link>
            </div>
            <section>
                <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                <ScrollArea className="bg-background rounded-lg shadow border p-4 whitespace-nowrap w-[calc(100vw-var(--sidebar-width)-5rem)]">
                    <div className="flex flex-row gap-4 p-4">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                className="w-64"
                            />
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-4">
                    Community Projects
                </h2>
                <div className="bg-background rounded-lg shadow border p-4">
                    <div className="text-muted-foreground italic">
                        im including this in hopes to add it in the future, good
                        luck future me!
                    </div>
                </div>
            </section>
        </div>
    );
}
