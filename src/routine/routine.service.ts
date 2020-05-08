import { Injectable } from '@nestjs/common';
import { RoutineRepository } from './db/routine.repository';
import { Routine } from './db/routine.entity';
import { User } from 'src/user/db/user.entity';
import { TemplateRepository } from './db/routineTemplate.repository';
import { RoutineTemplate } from './db/routineTemplate.entity';
import { CreateRoutineInput } from './inputs/createRoutine.input';
import { ExerciseRepository } from 'src/exercise/db/exercise.repository';

@Injectable()
export class RoutineService {
  constructor(
    private readonly routineRepository: RoutineRepository,
    private readonly templateRepository: TemplateRepository,
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  async getAll(user: User): Promise<Routine[]> {
    return await this.routineRepository.find({ where: { user } });
  }

  async findTemplates(routine: Routine): Promise<RoutineTemplate[]> {
    return this.templateRepository.find({
      where: { routine },
      relations: ['exercise'],
    });
  }

  async create(
    createRoutineInput: CreateRoutineInput,
    user: User,
  ): Promise<Routine | null> {
    const template = await Promise.all(
      createRoutineInput.template.map(async templateItem => {
        const exercise = await this.exerciseRepository.findOne({
          where: { id: templateItem.exercise },
        });
        return {
          sets: templateItem.sets,
          reps: templateItem.reps,
          exercise,
        };
      }),
    );
    if (template.length > 0) {
      return await this.routineRepository.save({
        user,
        name: createRoutineInput.name,
        description: createRoutineInput.description,
        template,
      });
    }
    return null;
  }

  async delete(id: string, user: User): Promise<number> {
    return await (await this.routineRepository.delete({ id, user })).affected;
  }
}
