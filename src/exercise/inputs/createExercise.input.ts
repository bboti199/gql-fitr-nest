import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ExerciseType } from '../db/exercise.entity';

@InputType()
export class CreateExerciseInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  body_part: string;

  @Field(() => ExerciseType)
  type: ExerciseType;

  @Field({ nullable: true })
  @IsOptional()
  is_public: boolean;
}
