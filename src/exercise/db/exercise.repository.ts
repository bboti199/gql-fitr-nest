import { Exercise } from './exercise.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Exercise)
export class ExerciseRepository extends Repository<Exercise> {}
