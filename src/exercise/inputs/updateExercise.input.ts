import { InputType, PartialType } from '@nestjs/graphql';
import { CreateExerciseInput } from './createExercise.input';

@InputType()
export class UpdateExerciseInput extends PartialType(CreateExerciseInput) {}
