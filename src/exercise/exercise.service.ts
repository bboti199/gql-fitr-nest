/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { Exercise } from './db/exercise.entity';
import { CreateExerciseInput } from './inputs/createExercise.input';
import { User } from 'src/user/db/user.entity';
import { ExerciseRepository } from './db/exercise.repository';
import { UpdateExerciseInput } from './inputs/updateExercise.input';

@Injectable()
export class ExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  /**
   * Return all the exercises from the database
   * @param {User} user - current user
   * @param {boolean} includePublic - to include public exercises too
   * @returns {Exercise[]} - exercises from the database
   */
  async getAll(user: User, includePublic = false): Promise<Exercise[]> {
    const whereCondition = includePublic
      ? [{ user }, { is_public: true }]
      : { user };

    return await this.exerciseRepository.find({
      where: whereCondition,
    });
  }

  /**
   * Inserts a new exercise with the current user as the owner
   * @param {CreateExerciseInput} createExerciseInput - exercise fields
   * @param {User} user - current user
   * @returns {Exercise | null} - return the created exercise if succeeeded otherwise null
   */
  async create(
    createExerciseInput: CreateExerciseInput,
    user: User,
  ): Promise<Exercise | null> {
    return await this.exerciseRepository.save(
      this.exerciseRepository.create({
        ...createExerciseInput,
        user,
      }),
    );
  }

  /**
   * Updates an exercise by id where the owner is the current user
   * @param {string} id - id of exercise
   * @param {UpdateExerciseInput} data - updated values of exercise
   * @param {User} user - current user
   * @returns {Exercise | null} - if exercise found the updated version otherwise null
   */
  async updateOne(
    id: string,
    data: UpdateExerciseInput,
    user: User,
  ): Promise<Exercise | null> {
    const exercise = await this.exerciseRepository.findOne({
      where: { id, user },
    });

    console.log(data);

    if (exercise) {
      return await this.exerciseRepository.save({ ...exercise, ...data });
    }
    return null;
  }

  /**
   * Deletes an exercise by id where the author is the current user
   * @param {string} id - id of a given exercise
   * @param {User} user - current user
   * @returns {number} - number of affected rows
   */
  async deleteOne(id: string, user: User): Promise<number> {
    return (await this.exerciseRepository.delete({ user, id })).affected;
  }
}
