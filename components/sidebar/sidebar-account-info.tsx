'use client';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { createClient } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';
import { LogoutButton } from '../logout-button';

export const SidebarAccountInfo = () => {
    const client = createClient();

    const handleSignOut = async () => {
        const { error } = await client.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
        } else {
            redirect('/auth/login');
        }
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <LogoutButton className="w-full" onClick={handleSignOut} />
            </SidebarMenuItem>
        </SidebarMenu>
    );
};
