import {
  Resolver,
  Query,
  ResolveField,
  Root,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { Routine } from './db/routine.entity';
import { RoutineService } from './routine.service';
import { UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/user/user.guard';
import { GetUser } from 'src/user/user.decorator';
import { User } from 'src/user/db/user.entity';
import { RoutineTemplate } from './db/routineTemplate.entity';
import { CreateRoutineInput } from './inputs/createRoutine.input';

@Resolver(() => Routine)
export class RoutineResolver {
  constructor(private readonly routineService: RoutineService) {}

  @Query(() => [Routine])
  @UseGuards(FirebaseAuthGuard)
  async routines(@GetUser() user: User): Promise<Routine[]> {
    return this.routineService.getAll(user);
  }

  @ResolveField('template')
  @UseGuards(FirebaseAuthGuard)
  async template(@Root() root: Routine): Promise<RoutineTemplate[]> {
    return this.routineService.findTemplates(root);
  }

  @Mutation(() => Routine, { nullable: true })
  @UseGuards(FirebaseAuthGuard)
  async insertOneRoutine(
    @Args('data') data: CreateRoutineInput,
    @GetUser() user,
  ): Promise<Routine | null> {
    return this.routineService.create(data, user);
  }

  @Mutation(() => Number)
  @UseGuards(FirebaseAuthGuard)
  async deleteOneRoutine(
    @Args('id') id: string,
    @GetUser() user,
  ): Promise<number> {
    return this.routineService.delete(id, user);
  }
}
