import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { UserSchema } from "./entities/users.entity";
import { UserStatusSchema } from "./entities/user-status.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "User", schema: UserSchema,
            },
            {
                name: "UserStatus", schema: UserStatusSchema
            }
        ])
    ],
    providers: [UsersResolver, UsersService, UsersRepository]
})

export class UsersModule { }