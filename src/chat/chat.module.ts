import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { ChatResolver } from "./chat.resolver";
import { ChatService } from "./chat.service";
import { ChatDao } from "./chat.dao";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatSchema } from "./entities/chat.entity";
import { RoomSchema } from "src/rooms/entities/rooms.entity";
import { RoomsDao } from "src/rooms/rooms.dao";
import { UsersDao } from "src/users/users.dao";
import { UserSchema } from "src/users/entities/users.entity";
import { RoomsService } from "src/rooms/rooms.service";

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
    providers: [ChatGateway, ChatResolver, ChatService, ChatDao, RoomsDao, UsersDao, RoomsService]
})
export class ChatModule { }