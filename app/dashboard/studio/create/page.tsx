'use client';

import { redirect } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Asterisk, RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function NewProjectPage() {
    const [projectName, setProjectName] = useState('');
    const [composer, setComposer] = useState('');
    const [bpm, setBpm] = useState(120);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const client = createClient();

    return (
        <div className="flex h-full w-full items-center justify-center p-6 md:p-10">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Create New Project
                    </CardTitle>
                    <CardDescription>
                        Enter the details for your new project.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="project-name" className="text-sm">
                            Project Name
                            <Asterisk className="inline text-red-500 w-3 h-3" />
                        </Label>
                        <Input
                            id="project-name"
                            type="text"
                            className="input"
                            placeholder="Enter project name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="composer" className="text-sm">
                            Composer
                        </Label>
                        <Input
                            id="composer"
                            type="text"
                            className="input"
                            placeholder="Enter composer name"
                            value={composer}
                            onChange={(e) => setComposer(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="bpm" className="text-sm">
                            BPM
                        </Label>
                        <Input
                            id="bpm"
                            type="number"
                            className="input"
                            placeholder="Enter BPM"
                            min={10}
                            max={300}
                            value={bpm}
                            onChange={(e) => setBpm(Number(e.target.value))}
                        />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button
                        className="mt-4"
                        onClick={async () => {
                            if (!projectName) {
                                setError('Project name is required.');
                                return;
                            }
                            setIsLoading(true);
                            setError(null);
                            const { data, error } = await client
                                .from('projects')
                                .insert({
                                    name: projectName,
                                    composer: composer || null,
                                    bpm: bpm || 120,
                                })
                                .select()
                                .single();
                            setIsLoading(false);
                            if (error) {
                                console.error('Insert error:', error);
                                setError(
                                    `Failed to create project: ${error.message}`,
                                );
                                return;
                            }
                            if (data) {
                                redirect(`/dashboard/studio/${data.id}`);
                            } else {
                                console.error('No data returned from insert');
                                setError('Project creation failed.');
                            }
                        }}
                        disabled={isLoading}
                    >
                        Create Project
                        {isLoading && (
                            <span className="animate-spin">
                                <RefreshCw className="w-4 h-4" />
                            </span>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
