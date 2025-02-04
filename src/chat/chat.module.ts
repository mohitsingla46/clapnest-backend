import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { ChatResolver } from "./chat.resolver";
import { ChatService } from "./chat.service";
import { ChatDao } from "./chat.dao";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatSchema } from "./entities/chat.entity";
import { RoomSchema } from "../rooms/entities/rooms.entity";
import { RoomsDao } from "../rooms/rooms.dao";
import { UsersDao } from "../users/users.dao";
import { UserSchema } from "../users/entities/users.entity";
import { RoomsService } from "../rooms/rooms.service";
import { UsersService } from "../users/users.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "Chat", schema: ChatSchema,
            },
            {
                name: "Room", schema: RoomSchema,
            },
            {
                name: "User", schema: UserSchema,
            }
        ]),
    ],
    providers: [ChatGateway, ChatResolver, ChatService, ChatDao, RoomsDao, UsersDao, RoomsService, UsersService]
})
export class ChatModule { }