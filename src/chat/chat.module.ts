import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { ChatResolver } from "./chat.resolver";
import { ChatService } from "./chat.service";
import { ChatDao } from "./chat.dao";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/auth/entities/users.entity";
import { AuthDao } from "src/auth/auth.dao";
import { RoleSchema } from "src/roles/entities/role.entity";
import { AuthService } from "src/auth/auth.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "User", schema: UserSchema
            },
            {
                name: "Role", schema: RoleSchema
            }
        ]),
    ],
    providers: [ChatGateway, AuthDao, ChatResolver, ChatService, ChatDao, AuthService]
})
export class ChatModule { }