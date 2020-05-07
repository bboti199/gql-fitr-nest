import firebaseAdmin from 'firebase-admin';
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './db/user.entity';
import { Repository } from 'typeorm';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export class FirebaseAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request: Request = ctx.getContext().req;

    let token;

    const { authorization } = request.headers;

    if (!authorization) {
      return false;
    }

    if (authorization.startsWith('Bearer ')) {
      token = authorization.split(' ')[1];
    } else {
      return false;
    }

    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

      const firebaseUser = await firebaseAdmin.auth().getUser(decodedToken.uid);

      let localUser = await this.userRepository.findOne({
        where: { fid: firebaseUser.uid },
      });

      if (localUser) {
        ctx.getContext().req.headers.user = localUser;
        return true;
      } else {
        localUser = this.userRepository.create({
          fid: firebaseUser.uid,
          email: firebaseUser.email,
        });
        this.userRepository.save(localUser);

        ctx.getContext().req.headers.user = localUser;

        return true;
      }
    } catch (error) {
      throw new UnauthorizedException({
        error: 'You are not authorized to access this resource',
      });
    }
  }
}
