import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/db/user.entity';
import { RoutineTemplate } from './routineTemplate.entity';

@Entity()
@ObjectType()
export class Routine {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @ManyToOne(
    () => User,
    user => user.routines,
    { onDelete: 'CASCADE' },
  )
  user: User;

  @OneToMany(
    () => RoutineTemplate,
    template => template.routine,
    { onDelete: 'CASCADE' },
  )
  @Field(() => [RoutineTemplate])
  template: RoutineTemplate[];

  @Field()
  @Column('timestamp', { default: new Date() })
  created_at: Date;
}
