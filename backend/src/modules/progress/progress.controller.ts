import { Body, Controller, Param, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { ProgressService } from "./progress.service";
import { UpdateProgressDto } from "./dto/update-progress.dto";

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
    constructor(private readonly progressService: ProgressService) {}

    @Post('topic/:topicId')
    async markTopicComplete(@Request() req, @Param('topicId') topicId: string) {
        return this.progressService.markTopicComplete(req.user.id, Number(topicId))
    }

    @Post('subject/:subjectId')
    async updateSubjectProgress(
        @Request() req,
        @Param('subjectId') subjectId: string,
        @Body() updateProgressDto: UpdateProgressDto
    ) {
        return this.progressService.updateSubjectProgress(
            req.user.id,
            Number(subjectId),
            updateProgressDto,
        )
    }
}