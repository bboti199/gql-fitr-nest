import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ConfigModule } from '@nestjs/config';
import { RoutineModule } from './routine/routine.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    UserModule,
    ExerciseModule,
    ConfigModule.forRoot(),
    RoutineModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
