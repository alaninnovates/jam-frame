'use client';

import { Button } from '@/components/ui/button';
import { Video, Play, Pause, Square } from 'lucide-react';

interface RecordingControlsProps {
    isRecording: boolean;
    isPaused: boolean;
    onStartRecording: () => void;
    onStopRecording: () => void;
    onTogglePause: () => void;
}

export function RecordingControls({
    isRecording,
    isPaused,
    onStartRecording,
    onStopRecording,
    onTogglePause,
}: RecordingControlsProps) {
    return (
        <div className="flex items-center gap-2">
            {!isRecording ? (
                <Button onClick={onStartRecording} variant="destructive">
                    <Video className="w-4 h-4 mr-2" />
                    Start Recording
                </Button>
            ) : (
                <>
                    <Button onClick={onTogglePause} variant="outline">
                        {isPaused ? (
                            <>
                                <Play className="w-4 h-4 mr-2" />
                                Resume
                            </>
                        ) : (
                            <>
                                <Pause className="w-4 h-4 mr-2" />
                                Pause
                            </>
                        )}
                    </Button>
                    <Button onClick={onStopRecording} variant="outline">
                        <Square className="w-4 h-4 mr-2" />
                        Stop
                    </Button>
                </>
            )}
        </div>
    );
}
