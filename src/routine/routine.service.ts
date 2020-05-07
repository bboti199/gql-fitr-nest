import { Injectable } from '@nestjs/common';
import { RoutineRepository } from './db/routine.repository';
import { Routine } from './db/routine.entity';
import { User } from 'src/user/db/user.entity';
import { TemplateRepository } from './db/routineTemplate.repository';
import { RoutineTemplate } from './db/routineTemplate.entity';

@Injectable()
export class RoutineService {
  constructor(
    private readonly routineRepository: RoutineRepository,
    private readonly templateRepository: TemplateRepository,
  ) {}

  async getAll(user: User): Promise<Routine[]> {
    return await this.routineRepository.find({ where: { user } });
  }

  async findTemplates(routine: Routine): Promise<RoutineTemplate[]> {
    return this.templateRepository.find({
      where: {
        routine,
      },
      relations: ['exercise'],
    });
  }
}
