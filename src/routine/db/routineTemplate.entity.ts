import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
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
  )
  routine: Routine;

  @OneToOne(() => Exercise)
  @JoinColumn()
  @Field(() => Exercise)
  exercise: Exercise;
}
