'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Volume2 } from 'lucide-react';
import { RecordingControls } from '@/app/dashboard/studio/_components/recording-controls';
import { MetronomeControl } from '@/app/dashboard/studio/_components/metronome-control';
import { TrackList } from '@/app/dashboard/studio/_components/track-list';

export default function StudioPage() {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [tracks, setTracks] = useState<any[]>([]);
    const [activeTrack, setActiveTrack] = useState<number | null>(null);
    const [metronomeEnabled, setMetronomeEnabled] = useState(true);
    const [bpm, setBpm] = useState(120);

    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<BlobPart[]>([]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            return stream;
        } catch (err) {
            console.error('Error accessing media devices:', err);
        }
    };

    useEffect(() => {
        startCamera();
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const startRecording = () => {
        if (!videoRef.current || !videoRef.current.srcObject) return;

        document
            .querySelectorAll<HTMLVideoElement>('.track-video')
            .forEach((video) => {
                video.currentTime = 0;
                video.play();
            });

        const stream = videoRef.current.srcObject as MediaStream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        chunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunksRef.current.push(e.data);
            }
        };

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);

            const newTrack = {
                id: Date.now(),
                name: `Track ${tracks.length + 1}`,
                url,
                blob,
            };

            setTracks([...tracks, newTrack]);
            setActiveTrack(tracks.length);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        setIsPaused(false);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            if (videoRef.current) {
                videoRef.current.srcObject = null;
                startCamera();
            }
            setIsRecording(false);
            setIsPaused(true);
        }
    };

    const togglePause = () => {
        if (!isRecording) return;
        if (isPaused) {
            mediaRecorderRef.current?.resume();
        } else {
            mediaRecorderRef.current?.pause();
        }
        setIsPaused(!isPaused);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 container px-4 py-6 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="relative aspect-video bg-background rounded-lg overflow-hidden border">
                        {tracks.length === 0 ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div
                                className={`w-full h-full grid grid-cols-2 grid-rows-2 gap-1`}
                            >
                                {tracks.map((track, index) => (
                                    <div
                                        key={track.id}
                                        className={`relative ${
                                            activeTrack === index
                                                ? 'ring-2 ring-primary'
                                                : ''
                                        }`}
                                        onClick={() => setActiveTrack(index)}
                                    >
                                        <video
                                            src={track.url}
                                            className="w-full h-full object-cover track-video"
                                            controls={false}
                                        />
                                        <div className="absolute bottom-2 left-2 text-xs bg-background/70 text-foreground px-2 py-1 rounded">
                                            {track.name}
                                        </div>
                                    </div>
                                ))}
                                <div className="relative">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-2 left-2 text-xs bg-background/70 text-foreground px-2 py-1 rounded">
                                        Live Camera
                                    </div>
                                </div>
                            </div>
                        )}

                        {isRecording && (
                            <div className="absolute top-4 right-4 flex items-center gap-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm">
                                <span className="animate-pulse w-3 h-3 bg-destructive-foreground rounded-full"></span>
                                Recording
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <RecordingControls
                            isRecording={isRecording}
                            isPaused={isPaused}
                            onStartRecording={startRecording}
                            onStopRecording={stopRecording}
                            onTogglePause={togglePause}
                        />

                        <div className="flex-1 min-w-[200px]">
                            <MetronomeControl
                                enabled={metronomeEnabled}
                                bpm={bpm}
                                onToggle={() =>
                                    setMetronomeEnabled(!metronomeEnabled)
                                }
                                onBpmChange={(value) => setBpm(value[0])}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <Tabs defaultValue="tracks">
                        <TabsList className="grid grid-cols-3 w-full">
                            <TabsTrigger value="tracks">Tracks</TabsTrigger>
                            <TabsTrigger value="layout">Layout</TabsTrigger>
                            <TabsTrigger value="audio">Audio</TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="tracks"
                            className="p-4 border rounded-md bg-card text-card-foreground"
                        >
                            <TrackList
                                tracks={tracks}
                                activeTrack={activeTrack}
                                onSelectTrack={setActiveTrack}
                                onRenameTrack={(id, name) => {
                                    setTracks(
                                        tracks.map((t) =>
                                            t.id === id ? { ...t, name } : t,
                                        ),
                                    );
                                }}
                                onDeleteTrack={(id) => {
                                    setTracks(
                                        tracks.filter((t) => t.id !== id),
                                    );
                                    if (
                                        activeTrack !== null &&
                                        tracks[activeTrack]?.id === id
                                    ) {
                                        setActiveTrack(null);
                                    }
                                }}
                            />
                        </TabsContent>
                        <TabsContent
                            value="layout"
                            className="p-4 border rounded-md bg-card text-card-foreground"
                        >
                            <div className="space-y-4">
                                <h3 className="font-medium">Layout Options</h3>
                                <p className="text-muted-foreground">
                                    nothin to see here :p
                                </p>
                            </div>
                        </TabsContent>
                        <TabsContent
                            value="audio"
                            className="p-4 border rounded-md bg-card text-card-foreground"
                        >
                            <div className="space-y-4">
                                <h3 className="font-medium">Audio Mixing</h3>
                                {tracks.map((track, index) => (
                                    <div
                                        key={track.id}
                                        className="flex items-center gap-3"
                                    >
                                        <Volume2 className="w-4 h-4 shrink-0 text-muted-foreground" />
                                        <span className="text-sm truncate">
                                            {track.name}
                                        </span>
                                        <Slider
                                            defaultValue={[80]}
                                            max={100}
                                            step={1}
                                            className="flex-1"
                                        />
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
