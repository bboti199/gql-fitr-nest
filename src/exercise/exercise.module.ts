import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseResolvers } from './exercise.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseRepository } from './db/exercise.repository';
import { UserRepository } from 'src/user/db/user.respository';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseRepository, UserRepository])],
  providers: [ExerciseService, ExerciseResolvers],
})
export class ExerciseModule {}
