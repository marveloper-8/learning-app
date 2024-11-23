import { Module } from "@nestjs/common";
import { TopicsController } from "./topics.controller";
import { TopicsService } from "./topics.service";
import { PrismaService } from "prisma/prisma.service";

@Module({
    controllers: [TopicsController],
    providers: [TopicsService, PrismaService]
})
export class TopicsModule {}