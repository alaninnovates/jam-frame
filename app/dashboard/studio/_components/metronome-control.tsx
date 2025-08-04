'use client';

import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useEffect, useRef } from 'react';

interface MetronomeControlProps {
    enabled: boolean;
    bpm: number;
    onToggle: () => void;
    onBpmChange: (value: number[]) => void;
}

export function MetronomeControl({
    enabled,
    bpm,
    onToggle,
    onBpmChange,
}: MetronomeControlProps) {
    const audioContextRef = useRef<AudioContext | null>(null);
    const metronomeIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext ||
            (window as any).webkitAudioContext)();

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (metronomeIntervalRef.current) {
                clearInterval(metronomeIntervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (enabled) {
            startMetronome();
        } else {
            stopMetronome();
        }

        return () => {
            stopMetronome();
        };
    }, [enabled, bpm]);

    const startMetronome = () => {
        if (!audioContextRef.current) return;

        const intervalMs = (60 / bpm) * 1000;

        if (metronomeIntervalRef.current) {
            clearInterval(metronomeIntervalRef.current);
        }

        metronomeIntervalRef.current = setInterval(() => {
            playMetronomeSound();
        }, intervalMs);
    };

    const stopMetronome = () => {
        if (metronomeIntervalRef.current) {
            clearInterval(metronomeIntervalRef.current);
            metronomeIntervalRef.current = null;
        }
    };

    const playMetronomeSound = () => {
        if (!audioContextRef.current) return;

        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);

        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;

        oscillator.start();

        gainNode.gain.exponentialRampToValueAtTime(
            0.001,
            audioContextRef.current.currentTime + 0.05,
        );

        oscillator.stop(audioContextRef.current.currentTime + 0.05);
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <Switch
                    id="metronome"
                    checked={enabled}
                    onCheckedChange={onToggle}
                />
                <label htmlFor="metronome" className="text-sm font-medium">
                    Metronome
                </label>
            </div>
            <div className="flex items-center gap-2 flex-1">
                <Slider
                    value={[bpm]}
                    min={40}
                    max={240}
                    step={1}
                    onValueChange={onBpmChange}
                    disabled={!enabled}
                    className="flex-1"
                />
                <span className="text-sm font-medium w-12 text-right">
                    {bpm} BPM
                </span>
            </div>
        </div>
    );
}
