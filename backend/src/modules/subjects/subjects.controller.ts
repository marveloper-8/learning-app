import { Controller, UseGuards } from "@nestjs/common";

@Controller('subjects')
@UseGuards(JwtAu)