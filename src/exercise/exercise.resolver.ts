import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExerciseService } from './exercise.service';
import { Exercise } from './db/exercise.entity';
import { CreateExerciseInput } from './inputs/createExercise.input';
import { UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/user/user.guard';
import { User } from 'src/user/db/user.entity';
import { GetUser } from '../user/user.decorator';
import { UpdateExerciseInput } from './inputs/updateExercise.input';

@Resolver(() => Exercise)
export class ExerciseResolvers {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Query(() => [Exercise])
  @UseGuards(FirebaseAuthGuard)
  async exercises(@GetUser() user: User): Promise<Exercise[]> {
    return this.exerciseService.getAll(user, true);
  }

  @Mutation(() => Exercise)
  @UseGuards(FirebaseAuthGuard)
  async insertOneExercise(
    @Args('data') data: CreateExerciseInput,
    @GetUser() user: User,
  ): Promise<Exercise | null> {
    return this.exerciseService.create(data, user);
  }

  @Mutation(() => Exercise, { nullable: true })
  @UseGuards(FirebaseAuthGuard)
  async updateOneExercise(
    @Args('id') id: string,
    @Args('data') data: UpdateExerciseInput,
    @GetUser() user: User,
  ): Promise<Exercise | null> {
    return this.exerciseService.updateOne(id, data, user);
  }

  @Mutation(() => Number)
  @UseGuards(FirebaseAuthGuard)
  async deleteOneExercise(
    @Args('id') id: string,
    @GetUser() user: User,
  ): Promise<number> {
    return this.exerciseService.deleteOne(id, user);
  }
}
