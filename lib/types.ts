export interface Project {
    id: number;
    title: string;
    thumbnail?: string;
    duration: number; // in seconds
    createdAt: Date;
    lastModified: Date;
}
