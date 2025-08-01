import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Welcome to JamFrame!</h1>
            <Image
                src="/logo.png"
                alt="JamFrame Logo"
                width={200}
                height={200}
                className="mb-6"
            />
            <p className="text-lg text-gray-700">
                Stitch together your music performances!
            </p>
            <a className="mt-6" href="/auth/login">
                <Button>Get Started</Button>
            </a>
        </div>
    );
}
