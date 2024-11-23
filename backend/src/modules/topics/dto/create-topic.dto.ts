import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTopicDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    videoUrl: string;

    @IsNumber()
    subjectId: number;
}