import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

@InputType()
export class CreateTemplateInput {
  @Field()
  @IsNotEmpty()
  @IsPositive()
  sets: number;

  @Field()
  @IsNotEmpty()
  @IsPositive()
  reps: number;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  exercise: string;
}
