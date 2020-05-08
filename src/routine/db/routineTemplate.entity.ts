import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Routine } from './routine.entity';
import { Exercise } from 'src/exercise/db/exercise.entity';

@Entity()
@ObjectType()
export class RoutineTemplate {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  sets: number;

  @Column()
  @Field()
  reps: number;

  @ManyToOne(
    () => Routine,
    routine => routine.template,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  routine: Routine;

  @ManyToOne(
    () => Exercise,
    exercise => exercise.templates,
    { cascade: true },
  )
  @Field(() => Exercise)
  exercise: Exercise;
}
