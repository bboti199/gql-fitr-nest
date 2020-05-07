import { Injectable } from '@nestjs/common';
import { User } from './db/user.entity';
import { UserRepository } from './db/user.respository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Return info about current user
   * @param {User} user - current user
   * @returns {User} - user entity
   */
  async getMe(user: User): Promise<User> {
    return this.userRepository.findOne({ where: { id: user.id } });
  }
}
