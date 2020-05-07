import { Resolver, Query, ResolveField, Root } from '@nestjs/graphql';
import { Routine } from './db/routine.entity';
import { RoutineService } from './routine.service';
import { UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/user/user.guard';
import { GetUser } from 'src/user/user.decorator';
import { User } from 'src/user/db/user.entity';
import { RoutineTemplate } from './db/routineTemplate.entity';

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
}
