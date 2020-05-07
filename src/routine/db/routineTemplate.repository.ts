import { EntityRepository, Repository } from 'typeorm';
import { RoutineTemplate } from './routineTemplate.entity';

@EntityRepository(RoutineTemplate)
export class TemplateRepository extends Repository<RoutineTemplate> {}
