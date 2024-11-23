import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { UpdateProgressDto } from "./dto/update-progress.dto";

@Injectable()
export class ProgressService {
    constructor(private readonly prisma: PrismaService) { }

    async markTopicComplete(userId: number, topicId: number) {
        const topic = await this.prisma.topic.findUnique({
            where: { id: topicId },
            include: { subject: true }
        })

        if (!topic) {
            throw new NotFoundException('Topic not found')
        }

        const progress = await this.prisma.userProgress.upsert({
            where: {
                userId_topicId: { userId, topicId }
            },
            update: { completed: true },
            create: {
                userId,
                topicId,
                subjectId: topic.subjectId,
                completed: true
            }
        })

        await this.updateSubjectCompletion(userId, topic.subjectId);

        return progress;
    }

    async updateSubjectProgress(
        userId: number,
        subjectId: number,
        updateProgressDto: UpdateProgressDto
    ) {
        const subject = await this.prisma.subject.findUnique({
            where: {id: subjectId},
            include: {topics: true}
        })

        if (!subject) {
            throw new NotFoundException('Subject not found')
        }

        const progressUpdates = subject.topics.map(topic => 
            this.prisma.userProgress.upsert({
                where: {
                    userId_topicId: {userId, topicId: topic.id}
                },
                update: {completed: updateProgressDto.completed},
                create: {
                    userId,
                    topicId: topic.id,
                    subjectId,
                    completed: updateProgressDto.completed
                }
            })
        )

        await Promise.all(progressUpdates)

        return this.getSubjectProgress(userId, subjectId)
    }

    private async updateSubjectCompletion(userId: number, subjectId: number) {
        const subject = await this.prisma.subject.findUnique({
            where: { id: subjectId },
            include: {
                topics: {
                    include: {
                        progress: {
                            where: { userId }
                        }
                    }
                }
            }
        })

        const totalTopics = subject.topics.length;
        const completedTopics = subject.topics.filter(topic => topic.progress.some(p => p.completed)).length;

        return this.prisma.userProgress.upsert({
            where: {
                userId_subjectId: {userId, subjectId}
            },
            update: {completed: totalTopics === completedTopics},
            create: {
                userId,
                subjectId,
                completed: totalTopics === completedTopics
            }
        })
    }

    private async getSubjectProgress(userId: number, subjectId: number) {
        return this.prisma.userProgress.findMany({
            where: { userId, subjectId },
            include: { topic: true }
        })
    }
}