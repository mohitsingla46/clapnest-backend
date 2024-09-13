import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { ChatResolver } from "./chat.resolver";
import { ChatService } from "./chat.service";
import { ChatDao } from "./chat.dao";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatSchema } from "./entities/chat.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "Chat", schema: ChatSchema,
            }
        ]),
    ],
    providers: [ChatGateway, ChatResolver, ChatService, ChatDao]
})
export class ChatModule { }