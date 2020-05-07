import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Exercise } from '../../exercise/db/exercise.entity';
import { Routine } from 'src/routine/db/routine.entity';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => ID)
  @Column({ unique: true })
  fid: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column('enum', { enum: ['ADMIN', 'USER'], default: 'USER' })
  role: string;

  @Field()
  @Column('timestamp', { default: new Date() })
  created_at: Date;

  @OneToMany(
    () => Exercise,
    exercise => exercise.user,
  )
  @Field(() => [Exercise], { nullable: true })
  exercises: Exercise[];

  @OneToMany(
    () => Routine,
    routine => routine.user,
  )
  @Field(() => [Routine])
  routines: Routine[];
}
