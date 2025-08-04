'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Video, Trash2, Edit2, Check, X, Music } from 'lucide-react';

interface Track {
    id: number;
    name: string;
    url: string;
}

interface TrackListProps {
    tracks: Track[];
    activeTrack: number | null;
    onSelectTrack: (index: number) => void;
    onRenameTrack: (id: number, name: string) => void;
    onDeleteTrack: (id: number) => void;
}

export function TrackList({
    tracks,
    activeTrack,
    onSelectTrack,
    onRenameTrack,
    onDeleteTrack,
}: TrackListProps) {
    const [editingTrack, setEditingTrack] = useState<number | null>(null);
    const [editName, setEditName] = useState('');

    const startEditing = (track: Track) => {
        setEditingTrack(track.id);
        setEditName(track.name);
    };

    const saveEdit = (id: number) => {
        onRenameTrack(id, editName);
        setEditingTrack(null);
    };

    const cancelEdit = () => {
        setEditingTrack(null);
    };

    if (tracks.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                <Music className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No tracks recorded yet</p>
                <p className="text-sm">Start recording to add tracks</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <h3 className="font-medium mb-2">Recorded Tracks</h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {tracks.map((track, index) => (
                    <div
                        key={track.id}
                        className={`flex items-center gap-2 p-2 rounded-md border ${
                            activeTrack === index
                                ? 'bg-primary/10 border-primary/20 dark:bg-primary/20 dark:border-primary/30'
                                : ''
                        }`}
                    >
                        <Video className="w-4 h-4 shrink-0" />

                        {editingTrack === track.id ? (
                            <div className="flex-1 flex items-center gap-1">
                                <Input
                                    value={editName}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                    }
                                    className="h-7 text-sm"
                                    autoFocus
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7"
                                    onClick={() => saveEdit(track.id)}
                                >
                                    <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7"
                                    onClick={cancelEdit}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <button
                                    className="flex-1 text-left truncate text-sm"
                                    onClick={() => onSelectTrack(index)}
                                >
                                    {track.name}
                                </button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7"
                                    onClick={() => startEditing(track)}
                                >
                                    <Edit2 className="w-3 h-3" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-destructive"
                                    onClick={() => onDeleteTrack(track.id)}
                                >
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
