import { Subject } from "@/types/subjects";
import Link from "next/link";
import { FC } from "react";

interface SubjectCardProps {
    subject: Subject
}

export const SubjectCard: FC<SubjectCardProps> = ({subject}) => {
    return (
        <Link href={`/subjects/${subject.id}`}>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                <h2 className="text-xl font-semibold mb-2">{subject.name}</h2>
                <p className="text-gray-600 mb-4">{subject.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        {subject.topics.length} Topics
                    </span>
                    {subject.completionRate && (
                        <span className="text-sm font-medium text-green-600">
                            {subject.completionRate}% completed
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
}