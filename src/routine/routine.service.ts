import { Injectable } from '@nestjs/common';
import { RoutineRepository } from './db/routine.repository';
import { Routine } from './db/routine.entity';
import { User } from 'src/user/db/user.entity';
import { TemplateRepository } from './db/routineTemplate.repository';
import { RoutineTemplate } from './db/routineTemplate.entity';
import { CreateRoutineInput } from './inputs/createRoutine.input';
import { ExerciseRepository } from 'src/exercise/db/exercise.repository';
import { UpdateRoutineInput } from './inputs/updateRoutine.input';

@Injectable()
export class RoutineService {
  constructor(
    private readonly routineRepository: RoutineRepository,
    private readonly templateRepository: TemplateRepository,
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  /**
   * Returns all routines for a given user
   * @param {User} user - current session user
   * @returns {Routine[]} - array of routines
   */
  async getAll(user: User): Promise<Routine[]> {
    return await this.routineRepository.find({ where: { user } });
  }

  /**
   * Resolves template field in a given routine
   * @param {Routine} routine - the given routine
   * @returns {RoutineTemplate[]} - an array of templates
   */
  async findTemplates(routine: Routine): Promise<RoutineTemplate[]> {
    return this.templateRepository.find({
      where: { routine },
      relations: ['exercise'],
    });
  }

  /**
   * Inserts a new workout routine for a user
   * @param {CreateRoutineInput} createRoutineInput
   * @param {User} user
   * @returns {Routine | null} - returns the created routine if succeeded otherwise null
   */
  async create(
    createRoutineInput: CreateRoutineInput,
    user: User,
  ): Promise<Routine | null> {
    /**
     * We map through the input type to check if the given exercise ids are valid ones
     * If found we return the correct type for the template field
     * which is needed by the routine entity
     */
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
    /**
     * If at least one template is correct we insert the new routine
     */
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

  /**
   * Deletes a routine from the database
   * @param {string} id
   * @param {User} user - owner of the routine
   * @returns {number} - returns the number of affected rows
   */
  async delete(id: string, user: User): Promise<number> {
    return await (await this.routineRepository.delete({ id, user })).affected;
  }

  /**
   * Updates a routine
   * @param {string} id
   * @param {UpdateRoutineInput} data - the new fields
   * @param {User} user - owner
   * @returns {Routine | null} - returns the new routine if succeeded otherwise null
   */
  async updateOne(
    id: string,
    data: UpdateRoutineInput,
    user: User,
  ): Promise<Routine | null> {
    const routine = await this.routineRepository.findOne({
      where: { id, user },
    });

    if (routine) {
      return await this.routineRepository.save({ ...routine, ...data });
    }

    return null;
  }
}
