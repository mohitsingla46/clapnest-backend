import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';
import { RolesModule } from './roles/role.module';
import { ChatModule } from './chat/chat.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI
      })
    }),
    AuthModule,
    SeedModule,
    RolesModule,
    ChatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
