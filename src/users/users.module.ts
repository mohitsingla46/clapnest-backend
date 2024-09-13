import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { UsersDao } from "./users.dao";
import { UserSchema } from "./entities/users.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "User", schema: UserSchema,
            }
        ])
    ],
    providers: [UsersResolver, UsersService, UsersDao]
})

export class UsersModule { }