import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { TopicsModule } from './modules/topics/topics.module';
import { ProgressModule } from './modules/progress/progress.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    SubjectsModule,
    TopicsModule,
    ProgressModule
  ],
  providers: [PrismaService],
})
export class AppModule {}
