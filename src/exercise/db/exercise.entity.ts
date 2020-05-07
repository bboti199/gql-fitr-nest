import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { User } from '../../user/db/user.entity';

export enum ExerciseType {
  COMPOUND = 'COMPOUND',
  ISOLATION = 'ISOLATION',
  OTHER = 'OTHER',
}

registerEnumType(ExerciseType, {
  name: 'ExerciseEnumType',
});

@Entity()
@ObjectType()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  body_part: string;

  @Field(() => ExerciseType)
  @Column('enum', { enum: ExerciseType })
  type: ExerciseType;

  @Field()
  @Column('boolean', { default: false })
  is_public: boolean;

  @Field()
  @Column('timestamp', { default: new Date() })
  created_at: Date;

  @ManyToOne(
    () => User,
    user => user.exercises,
    { nullable: true, onDelete: 'CASCADE' },
  )
  user: User;
}
