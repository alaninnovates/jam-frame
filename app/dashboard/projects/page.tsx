import { Button } from '@/components/ui/button';
import { Calendar, Clock, MoreVertical, Plus } from 'lucide-react';
import Link from 'next/link';

const projects = [
    {
        id: 1,
        title: 'String Quartet - Mozart',
        date: new Date(),
        duration: 100,
        thumbnail:
            'https://allaboutmozart.com/wp-content/uploads/2021/04/MozartHaydnPlaying-770x510.jpg',
    },
    {
        id: 2,
        title: 'Jazz Ensemble - Duke Ellington',
        date: new Date(),
        duration: 120,
        thumbnail:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Duke_Ellington_Big_Band.jpg/1200px-Duke_Ellington_Big_Band.jpg',
    },
    {
        id: 3,
        title: 'Rock Band - The Beatles',
        date: new Date(),
        duration: 150,
        thumbnail:
            'https://preview.redd.it/whats-your-opinion-on-the-beatles-rock-band-v0-9n10d3c36cgd1.jpeg?auto=webp&s=07704efc6f39ab11434c51a782f8b1450037a690',
    },
    {
        id: 4,
        title: 'Electronic Duo - Daft Punk',
        date: new Date(),
        duration: 180,
        thumbnail:
            'https://i.guim.co.uk/img/media/8f907d9d21a799efa5bac251d6c5e0457121e398/0_373_2096_1257/master/2096.jpg?width=465&dpr=1&s=none&crop=none',
    },
];

const humanizeDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
};

export default async function ProjectsPage() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-6 md:p-10">
                <h1 className="text-2xl font-bold mb-6">Projects</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white rounded-lg shadow-md p-4"
                        >
                            <div className="aspect-video relative">
                                <img
                                    src={
                                        project.thumbnail || '/placeholder.svg'
                                    }
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {humanizeDuration(project.duration)}
                                </div>
                            </div>
                            <div className="flex items-start justify-between">
                                <h2 className="font-medium">{project.title}</h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(project.date).toLocaleDateString()}
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Button
                                    variant="default"
                                    className="w-full flex-1"
                                >
                                    Edit
                                </Button>
                                <Button variant="outline">Share</Button>
                            </div>
                        </div>
                    ))}
                    <Link
                        href="/dashboard/studio/create"
                        className="border rounded-lg flex flex-col items-center justify-center p-8 h-full min-h-[250px] hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                            <Plus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-medium">Create New Project</h3>
                    </Link>
                </div>
            </div>
        </div>
    );
}
