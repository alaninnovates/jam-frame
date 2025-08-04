import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-6">Welcome to JamFrame!</h1>
            <Image
                src="/logo.png"
                alt="JamFrame Logo"
                width={200}
                height={200}
                className="mb-6"
            />
            <p className="text-lg text-muted-foreground">
                Stitch together your music performances!
            </p>
            <a className="mt-6" href="/auth/login">
                <Button>Get Started</Button>
            </a>
        </div>
    );
}
