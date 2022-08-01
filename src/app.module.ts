import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      envFilePath:
        process.env.NODE_ENV === 'dev'
          ? '.env.dev'
          : process.env.NODE_ENV === 'test'
          ? '.env.test'
          : '.env.prod',
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as MysqlConnectionOptions['type'],
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    RestaurantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
