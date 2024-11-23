import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { SubjectsService } from "./subjects.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";

@Controller('subjects')
@UseGuards(JwtAuthGuard)
export class SubjectsController {
    constructor(private readonly subjectsService: SubjectsService) {}

    @Get()
    async getAllSubjects() {
        return this.subjectsService.getAllSubjects();
    }

    @Get(':id')
    async getSubject(@Param('id') id: string) {
        return this.subjectsService.getSubject(Number(id));
    }

    @Get(':id/leaderboard')
    async getLeaderboard(@Param('id') id: string) {
        return this.subjectsService.getSubjectLeaderboard(Number(id));
    }

    @Post()
    async createSubject(@Body() createSubjectDto: CreateSubjectDto) {
        return this. subjectsService.createSubject(createSubjectDto)
    }
}