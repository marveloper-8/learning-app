'use client';

import { Button } from "@/components/common/Button";
import { subjectService } from "@/lib/api";
import { Topic } from "@/types/subjects";
import { useEffect, useState } from "react";

interface TopicPageProps {
    params: {
        subjectId: string;
        topicId: string;
    }
}

export default function TopicPage({params}: TopicPageProps) {
    const [topic, setTopic] = useState<Topic | null>(null);
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        const fetchTopicDetails = async () => {
            try {
                const response = await subjectService.getSubjectTopics(Number(params.subjectId));
                const selectedTopic = response.data.find(
                    (t: Topic) => t.id === Number(params.topicId)
                )
                setTopic(selectedTopic)
                setCompleted(selectedTopic.completed || false);
            } catch (error) {
                console.error('Failed to fetch topic details', error)
            }
        }

        fetchTopicDetails();
    }, [params.subjectId, params.topicId])

    const handleMarkComplete = async () => {
        try {
            await subjectService.markTopicCompleted(Number(params.topicId))
            setCompleted(true)
        } catch (error) {
            console.error('Failed to mark topic as complete', error)
        }
    }

    if (!topic) return <div>Loading...</div>

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>
                <p className="text-gray-600 mb-6">{topic.description}</p>

                <div className="mb-6">
                    <iframe
                        src={topic.videoUrl}
                        className="w-full h-96 rounded-xl"
                        title={topic.title}
                        allowFullScreen
                    />
                </div>

                <Button
                    onClick={handleMarkComplete}
                    disabled={completed}
                    className={`w-full ${completed ? 'bg-green-500' : 'bg-blue-500'}`}
                >{completed ? 'Completed ✓' : 'Mark as Complete'}</Button>
            </div>
        </div>
    )
}