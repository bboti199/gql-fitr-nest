import { Resolver, Query, ResolveField } from '@nestjs/graphql';
import { User } from './db/user.entity';
import { UserService } from './user.service';
import { GetUser } from './user.decorator';
import { UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from './user.guard';
import { Exercise } from 'src/exercise/db/exercise.entity';
import { ExerciseService } from 'src/exercise/exercise.service';
import { RoutineService } from 'src/routine/routine.service';
import { Routine } from 'src/routine/db/routine.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly exerciseService: ExerciseService,
    private readonly routineService: RoutineService,
  ) {}

  @Query(() => User)
  @UseGuards(FirebaseAuthGuard)
  async me(@GetUser() user: User): Promise<User> {
    return this.userService.getMe(user);
  }

  @ResolveField('exercises')
  async exercises(@GetUser() user: User): Promise<Exercise[]> {
    return this.exerciseService.getAll(user);
  }

  @ResolveField('routines')
  async routines(@GetUser() user: User): Promise<Routine[]> {
    return this.routineService.getAll(user);
  }
}
