import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTemplateInput } from './createTemplate.input';

@InputType()
export class CreateRoutineInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @Field(() => [CreateTemplateInput])
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateTemplateInput)
  template: CreateTemplateInput[];
}
