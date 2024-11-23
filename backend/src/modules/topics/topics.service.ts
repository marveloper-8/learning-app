import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateTopicDto } from "./dto/create-topic.dto";

@Injectable()
export class TopicsService {
    constructor(private readonly prisma: PrismaService) {}

    async getTopic(id: number) {
        const topic = await this.prisma.topic.findUnique({
            where: {id},
            include: {postgres: true}
        })

        if (!topic) {
            throw new NotFoundException('Topic not found')
        }

        return topic;
    }

    async createTopic(createTopicDto: CreateTopicDto) {
        return this.prisma.topic.create({data: createTopicDto})
    }
}