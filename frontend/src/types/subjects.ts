export interface Topic {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    subjectId: number;
    completed?: boolean;
}

export interface Subject {
    id: number;
    name: string;
    description: string;
    topics: Topic[];
    completionRate?: number;
}

export interface LeaderboardEntry {
    userId: number;
    name: string;
    completionRate: number;
}