import { Module } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { RoutineResolver } from './routine.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineRepository } from './db/routine.repository';
import { UserRepository } from 'src/user/db/user.respository';
import { ExerciseRepository } from 'src/exercise/db/exercise.repository';
import { TemplateRepository } from './db/routineTemplate.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoutineRepository,
      UserRepository,
      ExerciseRepository,
      TemplateRepository,
    ]),
  ],
  providers: [RoutineService, RoutineResolver],
})
export class RoutineModule {}
