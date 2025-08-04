import { LayoutDashboard, Library, Plus } from 'lucide-react';

export const routes = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Create',
        url: '/dashboard/studio/create',
        icon: Plus,
    },
    {
        title: 'My Projects',
        url: '/dashboard/projects',
        icon: Library,
    },
];
