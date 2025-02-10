import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { ChatResolver } from "./chat.resolver";
import { ChatService } from "./chat.service";
import { ChatRepository } from "./chat.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatSchema } from "./entities/chat.entity";
import { RoomSchema } from "../rooms/entities/rooms.entity";
import { RoomsRepository } from "../rooms/rooms.repository";
import { UsersRepository } from "../users/users.repository";
import { UserSchema } from "../users/entities/users.entity";
import { RoomsService } from "../rooms/rooms.service";
import { UsersService } from "../users/users.service";
import { UserChatStatusSchema } from "./entities/user-chat-status.entity";
import { UserStatusSchema } from "../users/entities/user-status.entity";

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
            },
            {
                name: "UserChatStatus", schema: UserChatStatusSchema,
            },
            {
                name: "UserStatus", schema: UserStatusSchema
            }
        ]),
    ],
    providers: [ChatGateway, ChatResolver, ChatService, ChatRepository, RoomsRepository, UsersRepository, RoomsService, UsersService]
})
export class ChatModule { }