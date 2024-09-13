import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ChatService } from "./chat.service";
import { ChatType } from "./entities/chat.entity";
import { CreateChatInput } from "./inputs/chat.input";

@Resolver()
export class ChatResolver {
    constructor(
        private chatService: ChatService
    ) { }

    @Mutation(() => ChatType)
    async saveMessage(@Args('input') input: CreateChatInput) {
        return await this.chatService.saveMessage(input);
    }

}