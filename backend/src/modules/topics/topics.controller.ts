import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { TopicsService } from "./topics.service";
import { CreateTopicDto } from "./dto/create-topic.dto";

@Controller('topics')
@UseGuards(JwtAuthGuard)
export class TopicsController {
    constructor(private readonly topicsService: TopicsService) {}

    @Get(':id')
    async getTopic(@Param('id') id: string){
        return this.topicsService.getTopic(Number(id))
    }

    @Post()
    async createTopic(@Body() createTopicDto: CreateTopicDto) {
        return this.topicsService.createTopic(createTopicDto);
    }
}