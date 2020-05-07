import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { ExerciseModule } from 'src/exercise/exercise.module';
import { ExerciseService } from 'src/exercise/exercise.service';
import { UserRepository } from './db/user.respository';
import { ExerciseRepository } from '../exercise/db/exercise.repository';
import { RoutineRepository } from 'src/routine/db/routine.repository';
import { RoutineModule } from 'src/routine/routine.module';
import { RoutineService } from 'src/routine/routine.service';
import { TemplateRepository } from 'src/routine/db/routineTemplate.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      ExerciseRepository,
      RoutineRepository,
      TemplateRepository,
    ]),
    ExerciseModule,
    RoutineModule,
  ],
  providers: [UserResolver, UserService, ExerciseService, RoutineService],
})
export class UserModule {}
