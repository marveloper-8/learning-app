import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";

@Injectable()
export class SubjectsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllSubjects() {
        const subjects = await this.prisma.subject.findMany({
            include: {
                topics: true,
                progress: true,
            }
        })

        return subjects.map(subject => ({
            ...subject,
            completionRate: this.calculateCompletionRate(subject.progress),
        }))
    }

    async getSubject(id: number) {
        const subject = await this.prisma.subject.findUnique({
            where: {id},
            include: {
                topics: true,
                progress: true,
            }
        })

        if (!subject) {
            throw new NotFoundException('Subject not found')
        }

        return {
            ...subject,
            completionRate: this.calculateCompletionRate(subject.progress),
        }
    }

    async getSubjectLeaderboard(subjectId: number) {
        const progress = await this.prisma.userProgress.findMany({
            where: {subjectId},
            include: {user: true},
            orderBy: {completed: 'desc'}
        })

        return progress.map(entry => ({
            userId: entry.userId,
            name: entry.user.name,
            completionRate: this.calculateCompletionRate([entry])
        }))
    }

    async createSubject(createSubjectDto: CreateSubjectDto) {
        return this.prisma.subject.create({
            data: createSubjectDto,
        })
    }

    private calculateCompletionRate(progress: any[]) {
        if (!progress.length) return 0;
        const completed = progress.filter(p => p.completed).length;
        return (completed / progress.length) * 100
    }
}