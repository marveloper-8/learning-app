'use client';

import { SubjectCard } from "@/components/dashboard/SubjectCard";
import { subjectService } from "@/lib/api";
import { Subject } from "@/types/subjects";
import { useEffect, useState } from "react";

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await subjectService.getAllSubjects();
                setSubjects(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch subjects', error);
                setLoading(false);
            }
        }

        fetchSubjects();
    }, [])

    if (loading) {
        return <div>Loading subjects...</div>
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Available Subjects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                    <SubjectCard key={subject.id} subject={subject} />
                ))}
            </div>
        </div>
    )
}